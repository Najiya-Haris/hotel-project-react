import React,{useEffect,useState} from 'react'
import Tables from '../../../Components/Table/Tables'
import {Button} from "antd";
import axios from "axios";
import config from '../../../config/Config';
import {useSelector} from "react-redux"
function Orderdetails() {
    const userDetails = useSelector((state) => state.user.loginUserDetails);
    const token = userDetails.tokens[userDetails.tokens.length - 1];
    const [data,setData]=useState([])
    const columns = [
      
        {
          title: 'tableName',
          dataIndex: 'tableName',
        },
        {
            title: 'supplierName',
            dataIndex: 'supplierName',
          },
          {
            title: 'totalPrice',
            dataIndex: 'totalPrice',
          },
      , {
          key: "4",
          title: "suppierStatus",
          render: (record) => {
            return (
              <>
                <Button className="act">{record.supplierStatus}</Button>
              </>
            );
          },
        },
      ]
        
  useEffect(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/manager/orderList`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log("response:",response.data.response);

      setData(response?.data.response)
    
      // setDailyDishes(response.data.response);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }, []);
  return (
    <div>
      <Tables  columns={columns} dataSource={data} />
    </div>
  )
}

export default Orderdetails
