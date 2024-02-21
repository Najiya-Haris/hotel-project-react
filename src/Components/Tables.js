import React, { useState } from "react";
import {
  Divider,
  Radio,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Menu,
  Dropdown,
} from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import axios from "axios";
import config from "../config/Config";
import { useSelector } from "react-redux";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const { Option } = Select;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Tables = ({ columns, dataSource }) => {
  const handleMenuClick = (key, record) => {
    console.log(record, "record");
  };
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  
  const token = userDetails.tokens;
  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",

      dataIndex: "age",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "status",
      render: (record) => {
        return (
          <>
            <Button className="act">Active</Button>
          </>
        );
      },
    },
    {
      title: "action",
      dataIndex: "name",
      render: (text, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            <Menu.Item key="edit" icon={<EditOutlined />}>
              Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const [tableData, setTableData] = useState([]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("email", values.email);
      formData.append("usertype", values.usertype);
      if (values.upload && values.upload.length > 0) {
        formData.append("image", values.upload[0].originFileObj);
      }
      const response = await axios.post(
        `${config.apiUrl}/manager/createChef`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
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
  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div>
      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        // columns={props.columns}
        // dataSource={props.dataSource}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};
export default Tables;
