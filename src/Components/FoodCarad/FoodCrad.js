import React, { useState } from "react";
import { Card, message } from "antd";
import tabless from "../../assets/nudle.jpeg";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import config from "../../config/Config";
import axios from "axios";
import { useSelector } from "react-redux";
import DailyDishes from "../../Modules/Chef/DailyDish/DailyDishes";

const FoodCard = ({
  data,
  name,
  onClick,
  price,
  setDishes,
  setModalOpen,
  editingModal,
  dailyDishes
}) => {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
 
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const handleEditClick = () => {
    editingModal(data);
  };


  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${config.apiUrl}/deleteFoodByChef`, {
        headers: {
          Authorization: token,
        },
        data: {
          dishId: data._id,
        },
      });

      if (response.data.isSuccess) {
        setIsDeleteModalVisible(false);
        setDishes((prevDishes) =>
          prevDishes.filter((dish) => dish._id !== data._id)
        );
        message.success("Dish deleted successfully");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
      message.error("Failed to delete dish");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: 10 }}
        cover={<img alt={data.title} src={tabless} />}
        onClick={onClick}
      >
        <Card.Meta title={data.name} description={data.description} />
        {price && (
  <p style={{ marginTop: 10, fontWeight: "bold" }}>Price: {price}</p>
)}
        <div style={{ textAlign: "right" }}>
          {[
            <DeleteOutlined
              style={{ marginRight: "15px" }}
              onClick={handleDeleteClick}
            />,
            <EditOutlined key="edit" onClick={handleEditClick} />,
          ]}
        </div>
        {/* {price && <p>Price: {price}</p>} */}
      </Card>
     
      <ConfirmationModal
        isOpen={isDeleteModalVisible}
        message="Are you sure you want to delete this item?"
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
export default FoodCard;
