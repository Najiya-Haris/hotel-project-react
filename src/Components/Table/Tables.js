import React, { useState } from "react";
import { Divider, Table, Button, Dropdown, Menu, Checkbox, Select } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const { Option } = Select;

const Tables = ({ columns, dataSource }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    console.log("sel", selectedRowKeys);
  };

  const handleMenuClick = (key, record) => {
    console.log(record, "record");
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Divider />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default Tables;
