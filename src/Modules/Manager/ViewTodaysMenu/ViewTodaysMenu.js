import React,{useEffect,useState} from 'react'
import Tables from '../../../Components/Table/Tables'
import {message,InputNumber} from "antd";
import config from '../../../config/Config';
import axios from "axios";
import {useSelector} from "react-redux"


function ViewTodaysMenu() {
    const userDetails = useSelector((state) => state.user.loginUserDetails);
    const token = userDetails.tokens[userDetails.tokens.length - 1];
    const [data,setData]=useState([])
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${config.apiUrl}/manager/viewTodaysMenu`,{
              headers: {
                Authorization: token,
              },
            });
            console.log("getMyDishes response:", response);
            if (response.data.isSuccess) {
              setData(response.data.response);
            } else {
              message.error(response.data.error);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Failed to fetch dishes");
          }
        };
    
        fetchData();
      }, []);
    const columns = [
      
        {
          title: "Dish Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },

      ];
    
  return (
    
    <Tables columns={columns} dataSource={data} />
  )
}

export default ViewTodaysMenu
