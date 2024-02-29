import React,{useEffect} from "react";
import Tables from "../../../Components/Table/Tables";
import { InputNumber,Button } from "antd";
import axios from "axios"
import config from "../../../config/Config";
import {useSelector} from "react-redux"

function Order() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const columns = [
    {
      title: "Table Name",
      dataIndex: "tablename",
      key: "tablename",
    },
    {
      title: "Dish Name",
      dataIndex: "dishName",
      key: "dishName",
    },
    {
      title: "Total price",
      dataIndex: "total",
      key: "totalprice",
    },
    {
      title: "Order taken by",
      dataIndex: "ordertakenby",
      key: "ordertakenby",
    },
    {
      key: "4",
      title: "status",
      render: (record) => {
        return (
          <>
            <Button className="act">Pay</Button>
          </>
        );
      },
    },
  ];

  const tableData = [
    {
      key: "1",
      dishName: "Dish 1",
      total: 7777,
      ordertakenby: "supplier1",
      tablename:"T1",
      
    },
    {
      key: "2",
      dishName: "dish2",
      total: 999,
      ordertakenby: "supplier1",
      tablename:"T1"
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/viewOrdersServed`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("res", response);

      // setDishes(response.data.response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
    useEffect(() => {
    fetchData();
  }, [token]);

  return <Tables columns={columns} dataSource={tableData} />;
}

export default Order;
