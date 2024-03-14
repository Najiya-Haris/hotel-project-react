import React,{useEffect} from 'react'
import Tables from '../../../Components/Table/Tables'
import {Button} from "antd";
import axios from "axios";
import config from '../../../config/Config';
import {useSelector} from "react-redux"

function Order() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const handleStatusChange = async (orderId, newstatus) => {
    console.log("oooo", orderId);
    try {
      const response = await axios.post(
        `${config.apiUrl}/updateStatusBySupplier`,
        { orderId, newstatus },
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
      title: 'dish',
      dataIndex: 'dish',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'quantity',

      dataIndex: 'quantity',
    },
    {
      title: 'price',
      dataIndex: 'price',
    }, {
      key: "4",
      title: "status",
      render: (record, menuIndex) => {
        return (
          <>
            <Select
              placeholder={record.supplierStatus}
              defaultValue={record.supplierStatus}
              onChange={(value) => {
                console.log(record);
                handleStatusChange(record.id, value);
              }}
            >
              <Option value="served">served</Option>
              <Option value="pending">Ready to pay</Option>
             
            </Select>
          </>
        );
      },
    },
  ];
  const tableData = [
    { dish: 'Dish 1', quantity: 2, price: 10, status: 'Active' },
    { dish: 'Dish 2', quantity: 3, price: 15, status: 'Active' },
    { dish: 'Dish 3', quantity: 1, price: 8, status: 'Active' },
   
  ];
  
  useEffect(async () => {
    try {
      const response = await axios.post(`${config.apiUrl}/orderList`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("response:cashier",response);
      // setDailyDishes(response.data.response);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }, []);
  return (
   
    <Tables  columns={columns} dataSource={data} />
  )

  }
export default Order