import React, { useState,useEffect } from "react";
import { Button, InputNumber } from "antd";
import "./TodaysMenu.css";
import FoodCard from "../../../Components/FoodCarad/FoodCrad";
import Mydishes from "../../Chef/MyDish/MyDishes";
import Tables from "../../../Components/Table/Tables";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import {useSelector} from "react-redux"
import axios from "axios"
import config from "../../../config/Config";

function TodaysMenu() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const navigate = useNavigate();
  const categories = ["all","breakfast","lunch","dinner"];


 
  const columns = [
    {
      title: "Dish Name",
      dataIndex: "dishName",
      key: "dishName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="dish" style={{ width: 100 }} />,
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
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          value={text}
          min={0}
          max={record.stock}
          onChange={(value) => handleQuantityChange(record.key, value, record.stock)}
        />
      ),
    },
    {
      title: "Total price",
      dataIndex: "total",
      key: "total",
    },
  ];

  const tableData = [
    {
      key: "1",
      dishName: "Dish 1",
      image:
        "data:image/jpeg;base64,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",
      stock: 10,
      price: 10,
      quantity: 0,
      total: 0
      ,
    },
    {
      key: "2",
      dishName: "dish2",
      image:
        "data:image/jpeg;base64,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",
      stock: 10,
      price: 15,
      quantity: 0,
      total: 0,
    },
  ];

  const handleQuantityChange = (key, quantity, stock) => {
    const updatedData = data.map(item => {
      if (item.key === key) {
        const newQuantity = quantity > stock ? stock : quantity;
        const newTotal = newQuantity * item.price;
        return { ...item, quantity: newQuantity, total: newTotal };
      }
      return item;
    });
    setData(updatedData);
  };
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${config.apiUrl}/viewTodaysMenu`, {
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

    fetchData();
  }, [token]);
  const [isConfirmTableModalOpen, setIsConfirmTableModalOpen] = useState(false);
  const handleConfirmTableModalOpen = () => setIsConfirmTableModalOpen(true);
  const handleConfirm = () => {
    message.success("your order has been confirmed");
    
  };
  const [data, setData] = useState(tableData);

  return (
    <div className="">
      <div className="mb-2">TodaysMenu</div>
      <div>
      {categories.map((category, index) => (
        <Button key={index} className="button1">
          {category}
        </Button>
      ))}
      </div>
      <div>
        <Button className="button2" onClick={handleConfirmTableModalOpen}>
          Add to Order List
        </Button>
        <ConfirmationModal
          isOpen={isConfirmTableModalOpen}
          message="Are you sure you want to cofirm this order"
          onClose={() => setIsConfirmTableModalOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>

      <Tables columns={columns} dataSource={data}  />

    </div>
  );
}

export default TodaysMenu;
