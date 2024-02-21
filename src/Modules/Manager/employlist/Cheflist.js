import React, { useState, useEffect } from "react";
import SecondaryTable from "../../../Components/SecondaryTable";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import { Button, Dropdown, Menu, message } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Cheflist() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const [visible, setIsVisible] = useState(false);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [selectedChef, setSelectedChef] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "gender",
      dataIndex: "gender",
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
    console.log("key", key, "record", record);
    if (key === "delete") {
      try {
        await axios.delete(
          `${config.apiUrl}/manager/deleteChef/${record.email}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setData((prevData) =>
          prevData.filter((item) => item._id !== record._id)
        );

        message.success("chef deleted successfully");
      } catch (error) {
        console.error("Error deleting chef:", error);
        message.error("Failed to delete chef");
      }
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/manager/viewChef`, {
          headers: {
            Authorization: token,
          },
        });

        setData(response.data.response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  const onFinish = async (formData) => {
    try {
      if (selectedChef) {
        const response = await axios.patch(
          `${config.apiUrl}/manager/supplierEdit`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedSupplier = response.data.response;

        setData((prevData) =>
          prevData.map((item) =>
            item.email === selectedChef.email ? updatedSupplier : item
          )
        );

        message.success("Supplier updated successfully");
      } else {
        console.log("hi");
        const response = await axios.post(
          `${config.apiUrl}/manager/createChef`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("res", response);

        const newChef = response.data.response[0];
        console.log("new", newChef);

        setData((prevData) => [...prevData, newChef]);

        message.success("chef created successfully");
      }
      setSelectedChef(null);
      setIsVisible(false);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to save chef");
    }
  };

  return <SecondaryTable columns={columns} data={data} onFinish={onFinish} />;
}

export default Cheflist;
