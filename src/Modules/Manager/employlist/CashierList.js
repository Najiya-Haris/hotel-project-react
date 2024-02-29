import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import PrimaryTable from "../../../Components/MainTable/MainTable";
import SecondaryTable from "../../../Components/MainTable/SecondaryTable";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import { Button, Dropdown, Menu, message } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function CashierList() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const [visible, setIsVisible] = useState(false);
  const [selectedCashier, setSelectedCashier] = useState(null);

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
          `${config.apiUrl}/manager/deleteCashier/${record.email}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setData((prevData) =>
          prevData.filter((item) => item._id !== record._id)
        );

        message.success("cashier deleted successfully");
      } catch (error) {
        console.error("Error deleting cashier:", error);
        message.error("Failed to delete cashier");
      }
    } else if (key === "edit") {
      setIsVisible(true);
      setEditData(record);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/manager/viewCashier`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setData(response.data.response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  const onFinish = async (formData) => {
    try {
      if (selectedCashier) {
        const response = await axios.patch(
          `${config.apiUrl}/manager/cashierEdit`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedCashier = response.data.response;

        setData((prevData) =>
          prevData.map((item) =>
            item.email === selectedCashier.email ? updatedCashier : item
          )
        );

        message.success("cashier updated successfully");
      } else {
        const response = await axios.post(
          `${config.apiUrl}/manager/createCashier`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("casjier", response);
        if (response.isSuccess) {
          const newCashier = response.data.response[0];
          setData((prevData) => [...prevData, newCashier]);
          message.success("cashier created successfully");
        } else {
          message.error(response.data.response);
        }
      }
      setSelectedCashier(null);
      setIsVisible(false);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to save cashier");
    }
  };
  return (
    <SecondaryTable
      columns={columns}
      data={data}
      editData={selectedCashier}
      onFinish={onFinish}
      showModals={ visible }
      setIsVisible={setIsVisible}
    />
  );
}
export default CashierList;
