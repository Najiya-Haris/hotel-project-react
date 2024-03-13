import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import SecondaryTable from "../../../Components/MainTable/SecondaryTable";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config/Config";
import { Button, Dropdown, Menu, message, Form } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SupplierList = () => {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [visible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  
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
        form.resetFields();
        message.success("Supplier deleted successfully");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        message.error("Failed to delete supplier");
      }
    } else {
      setIsVisible(true);
      setIsEdit(true);
      setSelectedSupplier(record);
    }
  };
  const clearFormFields = () => {
    form.resetFields();
  };
  const onFinish = async (values) => {
    console.log("isEdit", isEdit);
    if (!isEdit) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/manager/createSupplier`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.isSuccess) {
          const newSupplier = response.data.response[0];
          setData((prevData) => [...prevData, newSupplier]);
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
          `${config.apiUrl}/manager/supplierEdit`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("response :", response);
        if (response.data.isSuccess) {
          const editedSupplier = response.data.response;
          setData((prevData) =>
            prevData.map((supplier) =>
              supplier._id === editedSupplier._id ? editedSupplier : supplier
            )
          );
          message.success("Supplier edited successfully");
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
      editData={selectedSupplier}
      setIsVisible={setIsVisible}
    />
  );
};

export default SupplierList;
