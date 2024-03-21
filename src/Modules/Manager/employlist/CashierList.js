import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import PrimaryTable from "../../../Components/MainTable/MainTable";
import SecondaryTable from "../../../Components/MainTable/SecondaryTable";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import { Button, Dropdown, Menu, message,Form } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function CashierList() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const [visible, setIsVisible] = useState(false);
  const [selectedCashier, setSelectedCashier] = useState(null);
  const [data, setData] = useState([]);
   const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(false);
      const clearFormFields = () => {
    form.resetFields();
  };
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

        setData(response.data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
      setIsEdit(true);
      setSelectedCashier(record);
    }
  };


  const onFinish = async (values) => {
    console.log("isEdit", isEdit);
    if (!isEdit) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/manager/createCashier`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.isSuccess) {
          const newCashier = response.data.response[0];
          setData((prevData) => [...prevData, newCashier]);
          message.success("create");
          clearFormFields();
          setIsVisible(false);
        } else {
          message.error(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.patch(
          `${config.apiUrl}/manager/cashierEdit`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("response :", response);
        if (response.data.isSuccess) {
          const editedCashier = response.data.response;
          setData((prevData) =>
            prevData.map((cashier) =>
              cashier._id === editedCashier._id ? editedCashier : cashier
            )
          );
          message.success("cashier edited successfully");
          setIsVisible(false);
        } else {
          message.error(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SecondaryTable
        columns={columns}
      data={data}
      formprop={form}
      onFinish={onFinish}
      showModals={visible}
      edit={isEdit}
      editData={selectedCashier}
      setIsVisible={setIsVisible}
    />
  );
}
export default CashierList;
