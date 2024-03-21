import "./Login.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import axios from "axios";
import config from "../../config/Config";
import { message } from "antd";
// import { getMnagerLoginDetails } from "../Redux/ManagerReducer"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLoginDetails } from "../../Redux/UserReducer";
import { useSelector } from "react-redux";
function Login() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  console.log("userdetailslogin", userDetails);
  // const token = userDetails?.tokens[userDetails?.tokens.length - 1];
  const [value, setValue] = useState({
    email: "",
    password: "",
    userType: "manager", // Default user type
  });
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails) {
      navigate(`/${userDetails.userType}`);
    }
  }, [userDetails]);

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "vertical"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  const handleLogin = async () => {
    if (!value.email || !value.password) {
      message.error("Please fill in all the fields.");
      return;
    }

    try {
      const { email, password, userType } = value;
      const response = await axios.post(`${config.apiUrl}/login`, {
        email,
        password,
        userType,
      });
      console.log("login response", response);
      if (response.data.isSuccess) {
        const user = response.data.response;
        dispatch(getUserLoginDetails(user));
        navigate(`/${user.userType}`);
      } else {
        message.error(response.data?.error);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const navigateToForgetPassword = () => {
    // Navigate to the forget password page
    navigate("/forget");
  };

  return (
    <div className="login_container">
      <div className="login_topbar">
        <div className="empire">Hotel Empire</div>{" "}
      </div>
      <div className="log_card items-center justify-center h-[420px]  bg-white">
        <div>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{
              layout: formLayout,
            }}
            onValuesChange={onFormLayoutChange}
            style={{
              maxWidth: formLayout === "inline" ? "none" : 600,
            }}
          >
            <div className="formm">
              {/* <Form.Item className="welcome" label="Welcome Back" name="layout">
              <Radio.Group value={formLayout}></Radio.Group>
            </Form.Item> */}

              <Form.Item label="enter your email">
                <Input
                  className="input_container"
                  name="email"
                  type="email"
                  value={value.email}
                  rules={[
                    {
                      type: "email",
                      required: true,
                    },
                  ]}
                  onChange={(e) =>
                    setValue({ ...value, [e.target.name]: e.target.value })
                  }
                  placeholder="enter email"
                />
              </Form.Item>
              <Form.Item label="password">
                <Input
                  className="input_container"
                  type="password"
                  name="password"
                  value={value.password}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  onChange={(e) =>
                    setValue({ ...value, [e.target.name]: e.target.value })
                  }
                  placeholder="enter password"
                />
              </Form.Item>
              <Form.Item>
                <Radio.Group
                  value={value.userType}
                  onChange={(e) =>
                    setValue({ ...value, userType: e.target.value })
                  }
                >
                  <Radio value="manager">Manager</Radio>
                  <Radio value="chef">Chef</Radio>
                  <Radio value="supplier">Supplier</Radio>
                  <Radio value="cashier">Cashier</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item {...buttonItemLayout}>
                <Button className="submit_button" onClick={() => handleLogin()}>
                  <div className="submit_text">submit</div>
                </Button>
              </Form.Item>
              <div>
                <Button className="button3" onClick={navigateToForgetPassword}>
                  forgetpassword
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
