import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Tables";
import SecondaryTable from "../../../Components/SecondaryTable";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config/Config";
import { Button, Dropdown, Menu, message } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SupplierList = () => {
  const userDetails = useSelector((state) => state.user.loginUserDetails);

  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [visible, setIsVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

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
    if (key === "delete") {
      try {
        await axios.delete(
          `${config.apiUrl}/manager/deleteSupplier/${record.email}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setData((prevData) =>
          prevData.filter((item) => item._id !== record._id)
        );

        message.success("Supplier deleted successfully");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        message.error("Failed to delete supplier");
      }
    } else {
      setIsVisible(true);
      setSelectedSupplier(record);
    }
  };
  useEffect(() => {}, [selectedSupplier]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/manager/viewSupplier`,
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
      if (selectedSupplier) {
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
            item.email === selectedSupplier.email ? updatedSupplier : item
          )
        );

        message.success("Supplier updated successfully");
      } else {
        const response = await axios.post(
          `${config.apiUrl}/manager/createSupplier`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("res", response);
        if(response.isSuccess){

        const newSupplier = response.data.response[0];
        setData((prevData) => [...prevData, newSupplier]);

        message.success("Supplier created successfully");
      }else{
        message.error(response.data.response)
      }
    }
      setSelectedSupplier(null);
      setIsVisible(false);
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to save supplier");
    }
  };

  return (
    <SecondaryTable
      columns={columns}
      data={data}
      onFinish={onFinish}
      showModals={visible}
      editData={selectedSupplier}
      setIsVisible={setIsVisible}
    />
  );
};

export default SupplierList;
