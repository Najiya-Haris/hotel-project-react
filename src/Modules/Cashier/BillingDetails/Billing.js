import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import { Button, Modal, Radio,message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";

function Billing() {
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails?.tokens[userDetails.tokens.length - 1];
  useEffect(()=>{
    if(userDetails?.userType!=="cashier"){
      navigate(`/${userDetails.userType}`)
    }
  })
  useEffect(() => {
    if (data.length > 0) {
      const grandTotalRow = {
        key: "grandTotal",
        dish: "Grand Total",
        no: "",
        quantity: "",
        total: grandTotal,
      };
      setData((prevData) => [...prevData.filter((item) => item.key !== "grandTotal"), grandTotalRow]);
    }
  }, [grandTotal]);
  const columns = [
    {
      title: "no",
      dataIndex: "no",
      key: "no",
    },

    {
      title: "dishname",
      dataIndex: "dish",
      key: "dish",
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
  ];
  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/viewOrdersServed`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("res:cashier", response);

      if (response.data.isSuccess) {
        // Transform the response data into the format expected by the table
        const formattedData = response.data.response.data.map((order, index) => ({
          key: index + 1,
          dish: order.items.map((item) => item.foodName).join(", "),
          quantity: order.items.reduce((total, item) => total + item.quantity, 0),
          total: order.totalPrice,
        }));
        setData(formattedData);
        const total = formattedData.reduce((acc, item) => acc + item.total, 0);
        setGrandTotal(total);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const tableData = [
    {
      key: "1",
      dish: "biriyani",
      no: "1",
      quantity: "2",
      total: 1332,
    },
    {
      key: "2",

      dish: "puttu",
      no: "2",
      quantity: "9",
      total: 1332,
    },
  ];
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
      navigate("/paymentsuccess",{replace:true});
    } else {
      navigate("/razorpay",{replace:true});
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tableDataWithGrandTotal = [...tableData, grandTotalRow];
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
