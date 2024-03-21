import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import { Button, message, Dropdown, Select } from "antd";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector,useDispatch } from "react-redux";
import { getOrderDetails } from "../../../Redux/OrderReducer";

function OrderList() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [updatestatus, setUpdateStatus] = useState("");
  const dispatch = useDispatch();
  const { Option } = Select;

  useEffect( () => {
    try {

      const fetchData=async()=>{
        const response = await axios.post(
          `${config.apiUrl}/viewOrderList`,
          {},
          {
            headers: {
              Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("supplier", response);
        if (response.data.isSuccess) {
          dispatch(getOrderDetails(response?.data?.response))
          let order=response.data.response
          const formattedData = response?.data?.response.map((order, index) => ({
            id: order._id,
            key: index + 1,
            dish: order.items[0].foodName,
            tablename:order.tableName,
            quantity: order.items[0].quantity,
            price: order.items[0].price,
            supplierStatus: order.supplierStatus, 
          }));
          
        setData(formattedData);
        
      }
    }
    fetchData()
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }, []);

  const orderDetails=useSelector((state)=>state?.order?.orderDetails)

  console.log("order",orderDetails);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/updateStatusBySupplier`,
        { orderId, newStatus },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("resshh", response);
      if (response.data.success) {
        const updatedData = data.map((order) => 
        order._id === orderId ? { ...order, supplierStatus: newStatus } : order
      );
      setData(updatedData); 
    }
    } catch (err) {
      console.log(err.message);
    }
  };

  const columns = [
    {
      title: "dish",
      dataIndex: "dish",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "Tablename",
      dataIndex: "tablename",
    },
    {
      key: "4",
      title: "status",
      // dataIndex: "supplierStatus",
      render: (record) => {
        return (
          <>
            <Select
              placeholder="update status"
              defaultValue={record?.supplierStatus} 
              onChange={(value) => {
                console.log(record);
                handleStatusChange(record.id, value);
              }}
            >
              <Option value="ready_to_payment">ReadyToPay</Option>
              <Option value="pending">pending</Option>
              <Option value="cancel">cancel</Option>
            </Select>
          </>
        );
      },
    },
  ];
  const [data, setData] = useState([]);

  const handleConfirm = () => {
    message.success("order placed successfullly");
  };

  return <Tables columns={columns} dataSource={data} />;
}

export default OrderList;
