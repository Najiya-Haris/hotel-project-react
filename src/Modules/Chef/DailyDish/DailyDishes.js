import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import { Card, Space, Checkbox, Button, InputNumber,message } from "antd";
import FoodCard from "../../../Components/FoodCarad/FoodCrad";
import { useNavigate } from "react-router-dom";

function DailyDishes() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [dailyDishes, setDailyDishes] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [dishStocks, setDishStocks] = useState({});
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/dailyDish`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      setDailyDishes(response.data.response);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }, []);

  const handleCheckboxChange = (e, dishId) => {
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [dishId]: isChecked });
  };
  const handleStockChange = (value, dishId) => {
    setDishStocks({ ...dishStocks, [dishId]: value });
  };
  const handleAddToMenu = async () => {
    try {
      const selectedDishes = getCheckedDishes();

      const response = await axios.post(
        `${config.apiUrl}/addTodaysMenu`,
        selectedDishes,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      setSelectedItems(response.data[0].response);
      message.success("Successfully added to todays menu")
      // navigate("/menu")
    } catch (error) {
      console.log(error);
    }
  };


  const getCheckedDishes = () => {
    const selectedDishIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );

    const selectedDishes = selectedDishIds.map((id) => {
      const dish = dailyDishes.find((dish) => dish._id === id);
      return { dishId: dish._id, ...dish, stock: dishStocks[dish._id] || 0 };
    });

    return selectedDishes;
  };
  return (
    <div className="dish-container">
      {dailyDishes.map((dish, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <Checkbox onChange={(e) => handleCheckboxChange(e, dish._id)} />
          <FoodCard key={index} data={dish} />
          <InputNumber
            min={0}
            defaultValue={0}
            onChange={(value) => handleStockChange(value, dish._id)}
          />
        </div>
      ))}
      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <Button
          onClick={handleAddToMenu}
          type="primary"
          style={{ backgroundColor: "green" }}
        >
          Add to Today's Menu
        </Button>
      </div>
    </div>
  );
}

export default DailyDishes;
