import React, { useState } from 'react'
import { Button, Form, Input, Radio ,message} from "antd";
function Verify() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword,setNewPassword]=useState("")
    const handleSubmit=() => {
    }
  return (
    <div className="login_container">
    <div className="login_topbar">
      <div className="empire">Hotel Empire</div>
    </div>
    <div className="log_card items-center justify-center h-[420px] bg-white">
      <Form  layout="vertical">
          <Form.Item
          label="please enter your Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="please enter your otp"
          name="otp"
        
        >
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button  htmlType="submit" onClick={handleSubmit}>
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  )
}

export default Verify
