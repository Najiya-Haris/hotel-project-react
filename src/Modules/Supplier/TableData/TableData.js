import React, { useState, useEffect } from "react";
import "./TableData.css";
import table from "../../../assets/table.svg";
import tables from "../../../assets/tables.svg";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import { message, Button, Input, Upload, Modal, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import tableimage from "../../../assets/table.svg";

function TableData() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const userDetails = useSelector((state) => state.user.loginUserDetails);

  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${config.apiUrl}/viewTable`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setTableData(response.data.response);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${config.apiUrl}/addTable`, values, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      setTableData([...tableData, response.data.response.data[0]]);
      console.log("tableData", tableData);
      form.resetFields();
      setIsModalOpen(false)
      message.success("Table created successfully");

    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to create table");
    }
  };
  const [isConfirmTableModalOpen, setIsConfirmTableModalOpen] = useState(false);
  const handleConfirmTableModalOpen = () => setIsConfirmTableModalOpen(true);
  const handleConfirm = () => {
    message.success("your table has been confirmed");
    navigate("/todaysmenu");
  };

  return (
    <div>
      <div>
        <h1>select your table</h1>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{ backgroundColor: "green", borderColor: "green" }}
            type="primary"
            danger
            onClick={setIsModalOpen}
          >
            Add
          </Button>
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
            >
              <Form.Item
                label="tablename"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
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
              <Button htmlType="submit">Submit</Button>
            </Form>
          </Modal>
        </div>
      </div>
      <div className="tabledatas mt-6 w-[900px] h-[400px]">
        {tableData.map((tableItem, index) => (
          <div
            key={index}
            className="table-item"
            onClick={handleConfirmTableModalOpen}
          >
            <img src={tableimage} />
            <div className="table-name ml-12">{tableItem.name}</div>
          </div>
        ))}
        <ConfirmationModal
          isOpen={isConfirmTableModalOpen}
          message="Are you sure you want to cofirm this table?"
          onClose={() => setIsConfirmTableModalOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}

export default TableData;
