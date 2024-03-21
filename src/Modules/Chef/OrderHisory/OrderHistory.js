import React, { useState,useEffect } from 'react'
import axios  from "axios";
import config from '../../../config/Config';
import Tables from '../../../Components/Table/Tables'
import {useSelector} from "react-redux"

function OrderHistory() {
    const [data,setData]=useState([])
    const userDetails = useSelector((state) => state.user.loginUserDetails);
    const token = userDetails.tokens[userDetails.tokens.length - 1];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.apiUrl}/getDeliveredOrders`,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("response", response);
                if (response.data.isSuccess) {

                }
                
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };
        fetchData();
    }, []);
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
        },{
            title: "status",
            dataIndex:"status"
        }
      
    ]
  return (
   <Tables columns={columns} dataSource={data}/>
  )
}

export default OrderHistory
