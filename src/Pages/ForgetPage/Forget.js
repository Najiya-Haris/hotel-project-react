import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import config from "../../config/Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forget() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("hiii");
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/forgotPassword`, {
        email,
      });

      if (response.data.isSuccess) {
        console.log("Success:", response.data.message);
        navigate("/otp",{ state: { email: email } });
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

          <Form.Item>
            <Button htmlType="submit" onClick={handleSubmit}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Forget;
