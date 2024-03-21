import React, { useEffect, useState } from "react";
import Tables from "../../../Components/Table/Tables";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Menu,
  message,
  Form,
  Modal,
  Select,
  Input,
  Upload,
} from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../../config/Config";

function TodaysMenus() {
  const [data, setData] = useState([]);
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/viewTodaysMenuByChef`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.isSuccess) {
          setData(response.data.response);
        } else {
          message.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch dishes");
      }
    };

    fetchData();
  }, []);
  const [form] = Form.useForm();
  const { Option } = Select;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const columns = [
    {
      title: "Dish Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Dropdown overlay={menu(record)} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined />
            </a>
          </Dropdown>
        </>
      ),
    },
  ];
  const menu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = async (key, record) => {
    let menuId = record._id;
    if (key === "edit") {
      setIsModalOpen(true);
      setEditData(record);
      form.setFieldsValue({
        name: record.name,
        stock: record.stock,
        menuId: record._id,
      });

      // console.log("response,", response);
    } else if (key === "delete") {
      try {
        const response = await axios.delete(
          `${config.apiUrl}/deleteTodaysMenu`,
          {
            headers: {
              Authorization: token,
            },
            data: { menuId: menuId },
          }
        );

        console.log("Delete response:", response);

        if (response.data.isSuccess) {
          const newData = data.filter((item) => item._id !== record._id);
          setData(newData);
          message.success("Dish deleted successfully");
        } else {
          message.error(response.data.error);
        }
      } catch (error) {
        console.error("Error deleting dish:", error);
        message.error("Failed to delete dish");
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    const response = await axios.patch(
      `${config.apiUrl}/editTodaysMenu`,
      values,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("response", response);
    if (response.data.isSuccess) {
      const updatedMenu = response.data.response;
      const newData = data.map((item) => {
        if (item._id === updatedMenu._id) {
          return updatedMenu;
        }
        return item;
      });
      setData(newData);
      setIsModalOpen(false);
      message.success("Dish updated successfully");
    }
  };
  return (
    <>
      <Tables dataSource={data} columns={columns} />
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
          <Form.Item label="Id" name="menuId" style={{ display: "none" }}>
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
            label="stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input stock",
              },
            ]}
          >
            <Input />
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
    </>
  );
}

export default TodaysMenus;
