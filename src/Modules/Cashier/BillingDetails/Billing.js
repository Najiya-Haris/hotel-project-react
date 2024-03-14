import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import { Button, Modal, Radio, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";

function Billing() {
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails?.tokens[userDetails.tokens.length - 1];
  useEffect(() => {
    if (userDetails?.userType !== "cashier") {
      navigate(`/${userDetails.userType}`);
    }
  });
  useEffect(() => {
    if (data.length > 0) {
      const grandTotalRow = {
        key: "grandTotal",
        dish: "Grand Total",
        no: "",
        quantity: "",
        total: grandTotal,
      };
      setData((prevData) => [
        ...prevData.filter((item) => item.key !== "grandTotal"),
        grandTotalRow,
      ]);
    }
  }, [grandTotal]);
  const columns = [
    {
      title: "dishname",
      dataIndex: "foodname",
      key: "foodname",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "payment status",
      dataIndex: "paid",
      key: "paid",
    },
  ];
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/getReadyToPaymentOrders`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("res:cashier", response);
      if (response.data.success) {
        const formattedData = response.data.data.data.map((order, index) => ({
          key: index + 1,
          foodname: order.foodname,
          dish: order.items.map(item => item.foodname).join(", "), // Join multiple food names if there are multiple items
          quantity: order.items.map(item => item.quantity).join(", "), // Join multiple quantities if there are multiple items
          total: order.totalPrice,
          paid:order.items.map(item => item.paid).join(", "),// Assuming totalPrice is the total price of the order
        }));
        setData(formattedData);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [value, setValue] = useState(null);

  const grandTotalRow = {
    key: "grandTotal",
    dish: "Grand Total",
    no: "",
    quantity: "",
    total: grandTotal,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (value === "cod") {
      navigate("/paymentsuccess", { replace: true });
    } else {
      navigate("/razorpay", { replace: true });
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Tables columns={columns} dataSource={data} />
      <Button
        className="ml-80 mt-1
      h-[43px]"
        onClick={showModal}
        style={{ backgroundColor: "grey" }}
      >
        Proceed to payment
      </Button>
      <Modal
        title="Choose any method"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group onChange={(e) => setValue(e.target.value)}>
          <div>
            <Radio value="cod">COD</Radio>
          </div>
          <Radio value="chef">Online Payment</Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
}

export default Billing;
