import React, { useState } from 'react';
import Tables from '../../Components/Tables';
import { Button, message } from "antd";
import ConfirmationModal from '../../Components/ConfirmationModal';

function OrderList() {
  const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);

  const handleConfirmOrderModalOpen = () => {
    setIsConfirmOrderModalOpen(true);
  };

  const columns = [
    {
      title: 'dish',
      dataIndex: 'dish',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'price',
      dataIndex: 'price',
    }, 
    {
      key: "4",
      title: "status",
      render: (record) => {
        return (
          <>
            <Button className="act" onClick={handleConfirmOrderModalOpen}>pending</Button>
            <ConfirmationModal
              isOpen={isConfirmOrderModalOpen}
              message="Are you sure you want to cofirm this item?"
              onClose={() => setIsConfirmOrderModalOpen(false)}
              onConfirm={handleConfirm}
            />
          </>
        );
      },
    },
  ];

  const tableData = [
    { dish: 'Dish 1', quantity: 2, price: 10, status: 'Active' },
    { dish: 'Dish 2', quantity: 3, price: 15, status: 'Active' },
    { dish: 'Dish 3', quantity: 1, price: 8, status: 'Active' },
  ];

  const handleConfirm = () => {
    message.success("order placed successfullly");
  };
  
  return (
    <Tables  columns={columns} dataSource={tableData} />
  );
}

export default OrderList;
