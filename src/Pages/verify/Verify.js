import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import config from "../../config/Config";
import {useNavigate} from "react-router-dom"
import axios from "axios";
function Verify() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate=useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.apiUrl}/StoreNewPassword`,
        {
          otp,
          email,newPassword
        }
      );

      if (response.data.isSuccess) {
        console.log("Success:", response);
        navigate("/login")
        message.success(response.data.response)
        
      } else {
        message.error(response.data.error);
        console.error("Error:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login_container">
      <div className="login_topbar">
        <div className="empire">Hotel Empire</div>
      </div>
      <div className="log_card items-center justify-center h-[420px] bg-white">
        <Form layout="vertical">
          <Form.Item
            label="please enter your Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="please enter your otp" name="otp">
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
          </Form.Item>
          <Form.Item label="please enter your new password" name="newpassword">
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" onClick={handleSubmit}>
              submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Verify;
