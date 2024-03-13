import React, { useDebugValue, useEffect,useState } from "react";
import Tables from "../../../Components/Table/Tables";
import { Button, InputNumber,message } from "antd";
import axios from "axios"
import config from "../../../config/Config";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
function ChefMenu() {
  const { state } = useLocation();
  const { selectedDishes } = state??'';
  console.log("select",state);
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const columns = [
    {
      title: "Dish Name",
      dataIndex: "name",
      key: "name",
    },
  
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "stock",
      dataIndex: "stock",
      key: "stock",
  
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
  
    },
  
  ];
  

  return (
    <div>
      <Tables columns={columns} dataSource={selectedDishes} />
    </div>
  );
}

export default ChefMenu;
