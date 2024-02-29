import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PrimaryTable from "./MainTable";

const { Option } = Select;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function SecondaryTable({
  columns,
  data,
  onFinish,
  showModals,
  setIsVisible,
  editData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // useEffect(() => {
  // form.setFieldsValue({test:'Test'})
  // }, [])

  const handleFormFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phonenNumber", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("experience", values.experience);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("userType", values.userType);
      if (values.upload && values.upload.length > 0) {
        formData.append("image", values.upload[0].originFileObj);
      }
    } catch (err) {
      console.log(err);
    }
  };
 useEffect(() => {
  if (editData) {
    form.setFieldsValue({
      name: editData?.name,
      phoneNumber: editData?.phoneNumber,
      email: editData?.email,
      gender: editData?.gender,
      experience: editData?.experience,
      userType: editData?.userType,
    });
  } else {
    // Reset the form fields when not editing
    form.resetFields();
  }
}, [editData]);
  const showModal = () => {
    setIsModalOpen(true);
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsVisible(false);
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ backgroundColor: "green", borderColor: "green" }}
          type="primary"
          danger
          onClick={showModal}
        >
          Add
        </Button>
        <Modal
          title={editData ? "Edit Supplier" : "Add Supplier"}
          open={showModals}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
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
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            encType="multipart/form-data"
          >
            <Form.Item
              label="name"
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
              label="phonennumber"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your content!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your content!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {!editData && (
              <>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            )}

            <Form.Item
              label="gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please input your content!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="experience"
              name="experience"
              rules={[
                {
                  required: true,
                  message: "Please input your content!",
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
            <Form.Item
              name="userType"
              label="usertype"
              rules={[
                {
                  required: true,
                  message: "Please select usertype!",
                },
              ]}
            >
              <Select placeholder="select your role">
                <Option value="chef">Chef</Option>
                <Option value="supplier">supplier</Option>
                <Option value="cashier">cashier</Option>
              </Select>
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

          {/* <Form
    name="basic"
    form={form}
  >
    <Form.Item
      label="Test"
      name="test"
    >
      <Input />
    </Form.Item>
  </Form> */}
        </Modal>
      </div>

      <PrimaryTable columns={columns} data={data} />
    </div>
  );
}

export default SecondaryTable;
