import React, { useState } from "react";
import { Button, Card, Form, Input, Modal,Select } from "antd";
import "../../Chef/MyDishes.css";
import FoodCard from "../../../Components/FoodCrad";

function AllDishes() {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishesWithPrices, setDishesWithPrices] = useState([]);

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

  const handleSubmit = (values) => {
    const { price } = values;
    setDishesWithPrices([...dishesWithPrices, { ...selectedDish, price }]);
    setIsModalOpen(false);
  };

  const dishes = [
    {
      title: "Dish 1",
      description: "Description 1",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYxNcp7hvFQPupUs7_FhbGBXWMK5h-WxkdA&usqp=CAU",
    },
    {
      title: "Dish 2",
      description: "Description 2",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYxNcp7hvFQPupUs7_FhbGBXWMK5h-WxkdA&usqp=CAU",
    },
    {
      title: "Dish 3",
      description: "Description 3",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYxNcp7hvFQPupUs7_FhbGBXWMK5h-WxkdA&usqp=CAU",
    },
    {
      title: "Dish 4",
      description: "Description 4",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYxNcp7hvFQPupUs7_FhbGBXWMK5h-WxkdA&usqp=CAU",
    },
    {
      title: "Dish 5",
      description: "Description 5",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYxNcp7hvFQPupUs7_FhbGBXWMK5h-WxkdA&usqp=CAU",
    },
    {
      title: "Dish 6",
      description: "Description 6",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYxNcp7hvFQPupUs7_FhbGBXWMK5h-WxkdA&usqp=CAU",
    },
  ];

  return (
    <div>
      <div className="dish-container">
        {dishes.map((dish, index) => (
          <div key={index}>
            <FoodCard
              data={dish}
              onClick={() => showModal(dish)}
              price={dishesWithPrices.find((d) => d.title === dish.title)?.price}
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
            <Button type="primary" htmlType="submit">
              Add Price
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AllDishes;
