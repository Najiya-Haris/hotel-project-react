import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Modal, Select,message } from "antd";
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
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishesWithPrices, setDishesWithPrices] = useState([]);
  const [Dishes, setDishes] = useState([]);
  const [dailyDishes, setDailyDishes] = useState([]);
  const [priceAlreadyAdded, setPriceAlreadyAdded] = useState(false);
  const [editData, setEditData] = useState(false);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/manager/viewchef`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        console.log("neww",response);

        let dishdata = response.data.response.chefs

          .map((data) => data.dishes)
          .flat();
        setDishes(dishdata);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [editData]);

  const editingModal = (dish) => {
    setEditData(true);
    setIsModalOpen(true);
    form.setFieldsValue({
      price: dish.price,
      dishId:dish._id
    });
  };

  const showModal = (dish) => {
    console.log("add works");
    setEditData(false);
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
    if (!editData) {
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
        form.resetFields();
      } catch (error) {
        console.error("Error updating price:", error);
      }
    } else {
      try {
        const response = await axios.patch(
          `${config.apiUrl}/manager/updatePrice`,
          values,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("editresponse", response);
        if(response.data.isSuccess){
           setDishes((prevData) =>
    prevData.map((item) =>
      item._id === response.data.response._id
        ? response.data.response
        : item
    )
  );
          message.success("edited successfuly");
            form.resetFields();
          setIsModalOpen(false);

        }
      } catch (error) {
        console.error("Error editing price:", error);
      }
    }
  };
  return (
    <div>
      <div className="dish-container">
        {Dishes.map((dish, index) => (
          <div key={index}>
            <FoodCard
              data={dish}
              showModal={showModal}
              price={dish.price}
              dailyDishes={dailyDishes}
              editingModal={() => editingModal(dish)}
            />
          </div>
        ))}
      </div>

      <Modal
        title={editData ? "Edit Price" : "Add Price"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          
            <Form.Item label="Id" name="dishId" style={{ display: "none" }}></Form.Item>
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">
              {editData ? "Edit Price" : "Add Price"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AllDishes;
