import React, { useState } from "react";
import { Card, message, InputNumber } from "antd";
import tabless from "../../assets/nudle.jpeg";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import config from "../../config/Config";
import axios from "axios";
import { useSelector } from "react-redux";
import DailyDishes from "../../Modules/Chef/DailyDish/DailyDishes";
import { useLocation } from "react-router-dom";

const FoodCard = ({
  data,
  name,
  onClick,
  showModal,
  price,
  setDishes,
  handleStockChange,
  setModalOpen,
  editingModal,
}) => {
  const location = useLocation();
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };
  const handleEditClick = () => {
    console.log("editing model");
    editingModal(data._id);
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

  const handleAddButton = (data) => {
    console.log("data", data);
    showModal(data);
  };
  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: 10 }}
        cover={<img alt={data?.title} src={tabless} />}
        onClick={onClick}
      >
        <Card.Meta title={data?.name} description={data?.description} />
        {location.pathname !== "/mydishes" &&
          (data.price ? (
            <p style={{ marginTop: 10, fontWeight: "bold" }}>
              Price: {data?.price}
            </p>
          ) : (
            <p style={{ marginTop: 10, fontWeight: "bold" }}>
              Price: not added yet
            </p>
          ))}

        <div style={{ textAlign: "right" }}>
          {location.pathname !== "/dailydish" ? (
            <>
              <DeleteOutlined
                style={{ marginRight: "15px" }}
                onClick={handleDeleteClick}
              />
              {data.price ? (
                <EditOutlined
                  key="edit"
                  onClick={() => handleEditClick(data._id)}
                />
              ) : (
                userDetails.userType === "manager" && (
                  <PlusCircleOutlined onClick={() => handleAddButton(data)} />
                )
              )}
              {!data.price && userDetails.userType === "chef" && (
                <EditOutlined
                  key="edit"
                  onClick={() => handleEditClick(data._id)}
                />
              )}
            </>
          ) : (
            <InputNumber
              min={0}
              defaultValue={0}
              onChange={(value) => handleStockChange(value, data._id)}
            />
          )}
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
