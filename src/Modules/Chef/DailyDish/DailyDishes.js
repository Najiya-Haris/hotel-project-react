import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import { Card, Space, Checkbox, Button, InputNumber, message } from "antd";
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
  const [todaysmenu,setTodaysMenu]=useState([])

  const fetchDailyDishes = async () => {
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
      message.error("Failed to fetch daily dishes");
    }
  };

  const fetchTodaysMenu = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/viewTodaysMenuByChef`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.isSuccess) {
        setTodaysMenu(response.data.response);
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch today's menu");
    }
  };
  
  useEffect(() => {
    fetchDailyDishes();
    fetchTodaysMenu();
  }, []);

  const handleCheckboxChange = (e, dishId) => {
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [dishId]: isChecked });
  };
  const handleStockChange = (value, dishId) => {
    console.log('handle stock change', value, dishId);
    setDishStocks({ ...dishStocks, [dishId]: value });
  };
  const handleAddToMenu = async () => {
    try {
      const selectedDishes = getCheckedDishes();
      const dishesAlreadyAdded=todaysmenu.filter((dish)=>{
        selectedDishes.forEach((item)=>{
          if(dish.name===item.name){
            message.error(`${dish.name} already added. Update stocks in Todays Menu`)
            navigate("/TodaysMenuChef")
            return
          }
        })
      })
      const invalidDishes = selectedDishes.filter((dish) => dish.stock <= 0);
      if (invalidDishes.length > 0) {
        message.error(
          "Some dishes cannot be added to today's menu due to insufficient stock."
        );
        return;
        }

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
      console.log(response);
      if(response.data[0].isSuccess){
      
      setSelectedItems(response.data[0].response);
      message.success("Successfully added to todays menu");
     
      } 
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
          <FoodCard key={index} data={dish} handleStockChange={handleStockChange} />
          {/* <InputNumber
            min={0}
            defaultValue={0}
            onChange={(value) => handleStockChange(value, dish._id)}
          /> */}
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
