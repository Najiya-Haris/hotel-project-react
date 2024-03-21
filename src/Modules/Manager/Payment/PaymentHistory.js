import React,{useEffect, useState} from 'react'
import Tables from '../../../Components/Table/Tables';
import axios from "axios";
import config from '../../../config/Config';
import {useSelector} from "react-redux"

function PaymentHistory() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  
    const columns = [
        {
          title: 'date',
          dataIndex: 'paymentDate',
          render: (text) => <a>{text}</a>,
        },
       
        {
          title: 'amount recieved',
          dataIndex: 'amountPaid',
        }, 
        {
          title: 'order Id',
          dataIndex: 'orderId',
        }, 
        {
          title: 'dish Id',
          dataIndex: 'dishId',
        }, 
        {
          title: 'currency',
          dataIndex: 'currency',
        }, 
      ]
    
      function formatDate(dateString) {
        const cleanedDateString = dateString?.replace(/\s*GMT[+-]\d{4}.*$/, '');
        const date = new Date(cleanedDateString);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return ` ${dayOfWeek} ${month} ${day}, ${year} ${hours}:${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })} ${ampm}`;
    }
      const [data,setData]=useState([])
      useEffect(() => {
        const fetchPayments = async () => {
          try {
            const response = await axios.get(`${config.apiUrl}/manager/payments`, {
              headers: {
                Authorization: token
              }
            });
            console.log("Payment history:", response.data.response)
            response.data.response.forEach((item) => {
              item.paymentDate = formatDate(item.paymentDate);
            });
            setData(response.data.response)
            // Further processing of payment data can be done here
          } catch (error) {
            console.error("Error fetching payment history:", error);
          }
        };
    
        fetchPayments();
      }, [token]);
    
  return (
   <Tables  columns={columns} dataSource={data} />
  )
}

export default PaymentHistory