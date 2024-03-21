import React, { useState, useEffect, useRef } from "react";
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
import tableimage2 from "../../../assets/tables.svg";
import { useLocation } from "react-router-dom";
import UploadWidget from "../../Chef/Cloudinary/UploadWidget";
function TableData() {
  const { state } = useLocation();
  const [tableData, setTableData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const orderDetails = useSelector((state) => state.order?.orderDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/viewTable`,

        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedTableData = response.data.response?.map((table) => {
        for (let i = 0; i < orderDetails.length; i++) {
          if (
            orderDetails[i].items[0].paid === true &&
            table._id === orderDetails[i].tableId
          ) {
            return { ...table, status: "deselected" };
          }
        }
        return table;
      });

      setTableData(updatedTableData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleImageUpload = (imageUrl) => {
    setImageUrl(imageUrl);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const navigate = useNavigate();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
  
    try {
      
        const response = await axios.post(
          `${config.apiUrl}/addTable`,
        {...values,imageUrl}, 
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("tableData", response);
      if (response.data.isSuccess) {
        setTableData([...tableData, response.data.response[0]]);
        message.success("Table created successfully");
        form.resetFields();
        setIsModalOpen(false)
      }
    
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to create table");
    }
}

  const [selectedTableId, setSelectedTableId] = useState(null);
  const [status, setStatus] = useState("");
  const [isConfirmTableModalOpen, setIsConfirmTableModalOpen] = useState(false);
  const handleConfirmTableModalOpen = (tableId) => {
    const selectedTable = tableData.find((table) => table._id === tableId);
    if (selectedTable.status === "selected") {
      message.info("This table has already been selected");
    } else {
      setSelectedTableId(tableId);
      setStatus("selected");
      setIsConfirmTableModalOpen(true);
    }
  };
  // const handleConfirm = async (tableId, status) => {
  //   const response = await axios.post(
  //     `${config.apiUrl}/selectOrDeselectTable`,
  //     { tableId, status },
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   );

  //   if (response.data.isSuccess) {
  //     setStatus("selected");
  //     message.success("Your table has been confirmed");
  //     navigate("/todaysmenu", { state: { tableId: selectedTableId } });
  //   }
  // };
  const handleConfirm = () => {
    // message.success("your order has been confirmed");
    setIsConfirmTableModalOpen(false);
    navigate("/todaysmenu",{ state: { tableId: selectedTableId } });
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
              form={form}
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
                <Button icon={<UploadOutlined />}>
                  <UploadWidget onImageUpload={handleImageUpload} />
                </Button>
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
      </div>
      <div className="tabledatas mt-6 w-[900px] h-[400px]">
        {tableData.map((tableItem, index) => (
          <div
            key={index}
            className="table-item"
            onClick={() => handleConfirmTableModalOpen(tableItem._id)}
          >
            {tableItem.status === "selected" ? (
              <img src={tableimage2} />
            ) : (
              <img src={tableimage} />
            )}

            <div className="table-name ml-12">{tableItem.name}</div>
          </div>
        ))}
        <ConfirmationModal
          isOpen={isConfirmTableModalOpen}
          message="Are you sure you want to cofirm this table?"
          onClose={() => setIsConfirmTableModalOpen(false)}
          onConfirm={() => handleConfirm(selectedTableId, status)}
        />
      </div>
    </div>
  );
}

export default TableData;
