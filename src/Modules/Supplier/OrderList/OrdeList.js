import React, { useState, useEffect } from "react";
import Tables from "../../../Components/Table/Tables";
import { Button, message, Dropdown, Select } from "antd";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";

function OrderList() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);

  const { Option } = Select;

  useEffect(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/viewOrderList`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      if (response.data.isSuccess) {
        const formattedData = response.data.response.map((order) => {
          const latestStatus =
            order.chefUpdates.length > 0
              ? order.chefUpdates[order.chefUpdates.length - 1].status
              : "Unknown";
          return {
            id: order._id,
            dish: order.foodName,
            quantity: order.items[0].quantity,
            price: order.totalPrice,
            status: latestStatus,
          };
        });
        setData(formattedData);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }, []);

  const handleStatusChange = async (orderId, status) => {
    console.log("oooo", orderId);
    try {
      const response = await axios.post(
        `${config.apiUrl}/updateStatusByChef`,
        { orderId, status },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("ress", response);
      if (response.data.isSuccess) {
        console.log("data : ", data);
        // data.forEach((item)=>{
        //   if(item.id===orderId){
        //     item.status=status;
        //   }
        // })
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
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
      key: "4",
      title: "status",
      render: (record, menuIndex) => {
        return (
          <>
            <Select
              placeholder="update status"
              defaultValue={record.status}
              onChange={(value) => {
                console.log(record);
                handleStatusChange(record.id, value);
              }}
            >
              <Option value="served">served</Option>
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
