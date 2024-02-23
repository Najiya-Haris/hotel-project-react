import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Form,
  Upload,
  Input,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config/Config";
import "./MyDishes.css";
import FoodCard from "../../Components/FoodCrad";
import { useSelector } from "react-redux";

function Mydishes() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
 
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { Meta } = Card;
  const { Option } = Select;
  const [dishes, setDishes] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/getMyDishes`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("res", response);

        setDishes(response.data.response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const onFinish = async (FormData) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/addFoodByChef`,
        FormData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response",response);
      if (response.data.isSuccess) {
        const newFood = response.data.response.data[0];

        setDishes((prevData) => [...prevData, newFood]);
        message.success("Dish added successfully");
        console.log(dishes, "dishes");
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.log("Error in adding dish:", err);
      message.error("Failed to add dish");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div></div>
      <div className="flex justify-between">
        <div className="">MyDishes</div>
        <div>
          <Button className="" onClick={showModal}>
            add
          </Button>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            encType="multipart/form-data"
          >
            <Form.Item
              label="name of food"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your food name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your content!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="upload"
              label="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="category"
              label="category"
              rules={[
                {
                  required: true,
                  message: "Please select usertype!",
                },
              ]}
            >
              <Select placeholder="select category">
                <Option value="breakfast">breakfast</Option>
                <Option value="lunch">lunch</Option>
                <Option value="dinner">dinner</Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="dish-container">
        {dishes.map((dish, index) => (
          <FoodCard
            key={index}
            data={dish}
            setDishes={setDishes}
            setModalOpen={setIsModalOpen}
            linkTo="/single"
          />
        ))}
      </div>

      <div></div>
    </div>
  );
}

export default Mydishes;
