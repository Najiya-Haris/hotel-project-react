import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Modal, Select } from "antd";
import "../../Chef/MyDish/MyDishes.css";
import FoodCard from "../../../Components/FoodCarad/FoodCrad";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import DailyDishes from "../../Chef/DailyDish/DailyDishes";

function AllDishes() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishesWithPrices, setDishesWithPrices] = useState([]);
  const [Dishes, setDishes] = useState([]);
  const [dailyDishes, setDailyDishes] = useState([]);
  const [priceAlreadyAdded, setPriceAlreadyAdded] = useState(false);
  const showModal 
  = (dish) => {
    setSelectedDish(dish);
    setPriceAlreadyAdded(!!dish.price);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    const { price } = values;
    try {
      const response = await axios.post(
        `${config.apiUrl}/manager/addPrice`,
        {
          dishId: selectedDish._id,
          price: price,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
        
        
      );
      console.log("priceresponse", response);
      const updatedDishes = Dishes.map((dish) => {
        if (dish._id === selectedDish._id) {
          return { ...dish, price: price };
        }
        return dish;
      });
      setDishes(updatedDishes);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/manager/viewchef`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        let dishdata = response.data.response.data.chefs

          .map((data) => data.dishes)
          .flat();
        setDishes(dishdata);
        console.log("dishdata", dishdata);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);


  return (
    <div>
      <div className="dish-container">
        {Dishes.map((dish, index) => (
          <div key={index}>
            <FoodCard
              data={dish}
              onClick={() => showModal(dish)}
              price={dish.price}
              dailyDishes={dailyDishes}
            />
          </div>
        ))}
      </div>
      {/* <DailyDishes dailyDishes={dailyDishes} /> */}

      <Modal
        title="Add Price"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >

{priceAlreadyAdded && <p>Price already added for this dish</p>}
        {!priceAlreadyAdded && (
          <Form onFinish={handleSubmit}>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add Price</Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default AllDishes;
