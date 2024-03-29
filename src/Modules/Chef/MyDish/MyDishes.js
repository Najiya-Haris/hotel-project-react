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
import config from "../../../config/Config";
import "../MyDish/MyDishes.css";
import FoodCard from "../../../Components/FoodCarad/FoodCrad";
import { useSelector } from "react-redux";
import UploadWidget from "../Cloudinary/UploadWidget";

function Mydishes() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [form] = Form.useForm();
  const [editData, setEditingData] = useState(false);
  const { Meta } = Card;
  const { Option } = Select;
  const [imageUrl, setImageUrl] = useState("");
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
        console.log("getmydishes", response);
        if (response.data.isSuccess) {
          setDishes(response.data.response);
        } else {
          message.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleImageUpload = (imageUrl) => {
    setImageUrl(imageUrl);
  };
  const onFinish = async (values) => {
    if (imageUrl) {
      values = { ...values, imageUrl }; // Add imageUrl to the values object
    }
    console.log("valuesssss",imageUrl);
    try {
      console.log("try");
      if (!editData) {
        const response = await axios.post(
          `${config.apiUrl}/addFoodByChef`,
          values,
          {
            headers: {
              Authorization: token,
              // "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("addresponse",response);
        if (response.data.isSuccess) {
          const newFood = response.data.response[0];

          setDishes((prevData) => [...prevData, newFood]);
          setIsModalOpen(false);
          message.success("Dish added successfully");
          form.resetFields();
        } else {
          message.error(response.data.error);
        }
      } else {
        const payload = {
          dishId: values.dishId,
          name: values.name,
          description: values.description,
          category: values.category,
        };
        const response = await axios.post(
          `${config.apiUrl}/editMyDishes`,
          values,
          {
            headers: {
              Authorization: token,
              // "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("edit", response);
        if (response.data.isSuccess) {
          setDishes((prevData) =>
            prevData.map((item) =>
              item._id === response.data.response._id
                ? response.data.response
                : item
            )
          );
          message.success("edited successfuly");
          form.resetFields();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.log("Error in adding dish:", err);
      message.error("Failed to add dish");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editingModal = (dish) => {
    console.log(dish._id);
    setEditingData(true);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: dish.name,
      description: dish.description,
      category: dish.category,
      dishId: dish._id,
    });
  };

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
          footer={false}
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
            form={form}
          >
            <Form.Item label="Id" name="dishId" style={{ display: "none" }}>
              <Input type="hidden" />
            </Form.Item>
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
             <Button icon={<UploadOutlined />}>
                  <UploadWidget onImageUpload={handleImageUpload} />
                </Button>
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
            editingModal={() => editingModal(dish)}
            linkTo="/single"
          />
        ))}
      </div>

      <div></div>
    </div>
  );
}

export default Mydishes;
