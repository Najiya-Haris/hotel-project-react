import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Modal, Select } from "antd";
import "../../Chef/MyDishes.css";
import FoodCard from "../../../Components/FoodCrad";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";

function AllDishes() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);

  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishesWithPrices, setDishesWithPrices] = useState([]);
  const [Dishes, setDishes] = useState([]);

  const showModal = (dish) => {
    setSelectedDish(dish);
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
      console.log("priceresponse", response); // Access response data using response.data
  
      // Handle response data here as needed
  
      // setDishesWithPrices([...dishesWithPrices, { ...selectedDish, price }]);
      // setIsModalOpen(false);
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
          console.log("dishdata",dishdata);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);
  console.log("dishes", Dishes);

  return (
    <div>
      <div className="dish-container">
        {Dishes.map((dish, index) => (
          <div key={index}>
            <FoodCard
              data={dish}
              onClick={() => showModal(dish)}
              price={
                dishesWithPrices.find((d) => d.title === dish.title)?.price
              }
            />
          </div>
        ))}
      </div>

      <Modal
        title="Add Price"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Add Price</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AllDishes;
