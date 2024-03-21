import React, { useState, useEffect } from "react";
import { Button, InputNumber } from "antd";
import "./TodaysMenu.css";
import FoodCard from "../../../Components/FoodCarad/FoodCrad";
import Mydishes from "../../Chef/MyDish/MyDishes";
import Tables from "../../../Components/Table/Tables";
import { Link } from "react-router-dom";
import { message, Checkbox, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Components/ConfirmationModal/ConfirmationModal";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../../config/Config";
import { useLocation } from "react-router-dom";

function TodaysMenu() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  console.log("use location :", state);
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/viewTodaysMenu`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("getMyDishes response:", response);
        if (response.data.isSuccess) {
          setDishes(response.data.response);
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

  const { tableId } = state ?? "";
  console.log("id", tableId);

  console.log("token", token);
  const navigate = useNavigate();

  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleCheckboxChange = (data, checked) => {
    if (checked) {
      setSelectedDishes([...selectedDishes, data]);
    } else {
      setSelectedDishes(
        selectedDishes.filter((selectedDish) => selectedDish.key !== data.key)
      );
    }
  };

  console.log(selectedDishes, "ddddd");
  const columns = [
    {
      title: "Select", // Checkbox column
      dataIndex: "key",
      key: "select",
      render: (text, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
        />
      ),
    },
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
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          value={text}
          min={0}
          max={record.stock}
          onChange={(value) => {
            console.log(record);
            handleQuantityChange(record._id, value, record.stock);
          }}
        />
      ),
    },
    {
      title: "Total price",
      dataIndex: "total",
      key: "total",
    },
  ];

  const handleQuantityChange = (key, quantity, stock) => {
    const updatedData = dishes.map((item) => {
      if (item._id === key) {
        const newQuantity = quantity > stock ? stock : quantity;
        const newTotal = newQuantity * item.price;
        return { ...item, quantity: newQuantity, total: newTotal };
      }
      return item;
    });

    setDishes(updatedData);

    const updatedSelectedDishes = selectedDishes.map((dish) => {
      if (dish._id === key) {
        return { ...dish, quantity: quantity };
      }
      return dish;
    });

    setSelectedDishes(updatedSelectedDishes);
  };
  console.log("selecteddishesss: ", selectedDishes);
  const handleOrder = async () => {
    const supplierStatus = "pending";
    try {
      const response = await axios.post(
        `${config.apiUrl}/orderList`,
        { selectedDishes, tableId, supplierStatus },

        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("resspooo", response);
      if (response.data.isSuccess) {
        message.success("order confirmed");
        // navigate("/orderlist")
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const [isConfirmTableModalOpen, setIsConfirmTableModalOpen] = useState(false);
  const handleConfirmTableModalOpen = () => {
    if (selectedDishes.length === 0) {
      message.error("please select any dish");
    } else {
      setIsConfirmTableModalOpen(true);
    }
  };
  const handleConfirm = () => {
    // message.success("your order has been confirmed");
    handleOrder();
    setIsConfirmTableModalOpen(false);
  };
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <>
      {loading ?? <Spin />}
      {console.log("load", loading)}
      <div className="">
        <div className="mb-2">TodaysMenu</div>
        <div>
          {["all", "breakfast", "lunch", "dinner"].map((category) => (
            <Button
              key={category}
              className="button1"
              onClick={() => handleCategoryChange(category)}
            >
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

        <Tables columns={columns} dataSource={filteredDishes} />
      </div>
    </>
  );
}

export default TodaysMenu;
