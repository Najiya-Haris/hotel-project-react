import React,{useState,useEffect} from 'react';
import { Avatar, Card } from 'antd';
import { useSelector,useDispatch } from "react-redux";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,UploadOutlined
  
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Upload,
  Input,
  Select,
  message,
} from "antd";
import { updateUserDetails } from '../../Redux/UserReducer';

const { Meta } = Card;
const { Option } = Select;

const CommonProfileCard = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData,setEditData]=useState(null);
  const dispatch=useDispatch()
  const showModal = () => {
    setIsModalOpen(true);
  setEditData(userDetails)
  };
  useEffect(() => {
    if (editData) {
      console.log(editData);
      form.setFieldsValue({
        name: editData?.name,
        email: editData?.email,
      });
    } else {
      form.resetFields();
    }
  }, [editData]);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const onFinish=(values)=>{
    console.log("values",values);
    dispatch(updateUserDetails(values)); 
    setIsModalOpen(false); 

  }

  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title={userDetails.name} 
        description={userDetails.email} 
      />
        <div style={{ textAlign: "right" }}>
       <EditOutlined key="edit" onClick={showModal} />,
       </div>
       <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
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
            encType="multipart/form-data"
            form={form}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your food name!",
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
    </Card>
    
  );
};

export default CommonProfileCard;
