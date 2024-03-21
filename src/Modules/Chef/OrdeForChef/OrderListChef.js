import React, { useState,useEffect } from 'react'
import Tables from '../../../Components/Table/Tables';
import axios from "axios"
import config from '../../../config/Config';
import {useSelector} from "react-redux";
import {Select,Button} from "antd"
function OrderListChef() {
    const [data,setData]=useState([])
    const userDetails = useSelector((state) => state.user.loginUserDetails);
    const token = userDetails.tokens[userDetails.tokens.length - 1];
    const { Option } = Select;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.apiUrl}/getAllOrdersForChef`,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("response", response);
                if (response.data.isSuccess) {
                    setData(response.data.response.map(order => ({
                        key: order._id,
                        dish: order.foodName,
                        quantity: order.items.map(item => item.quantity).join(", "),
                        price: order.totalPrice,
                        status: order.supplierStatus,
                        tablename:order.tableName
                    })));
                }
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };
        fetchData();
    }, []);
      const handleStatusChange=async(record)=>{
        console.log("record",record);
        const response=await axios.get(`${config.apiUrl}/updateOrderByChef`,{
            headers:{
                Authorization:token,
            }
        })
        console.log("jjjjjjj",response);

      }
    const columns = [
        {
          title: "dish",
          dataIndex: "dish",
         
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
            title: "tablename",
            dataIndex: "tablename",
          },
           {
            key: "status",
            title: "Status",
            render: (record) => (
                
                
                <>
               
                    <Button
                        onClick={() => handleStatusChange(record.key, "delivered")}
                        style={{ marginRight: 8, background: record.status === "delivered" ? "#52c41a" : "" }}
                    >
                        Delivered
                    </Button>
                    <Button
                        onClick={() => handleStatusChange(record.key, "cancel")}
                        style={{ marginRight: 8, background: record.status === "cancel" ? "#f5222d" : "" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleStatusChange(record.key, "pending")}
                        style={{ background: record.status === "pending" ? "#faad14" : "" }}
                    >
                        Pending
                    </Button>
                </>
            ),
        },
    ];
  return (
  <Tables columns={columns} dataSource={data} />
  )
}

export default OrderListChef
