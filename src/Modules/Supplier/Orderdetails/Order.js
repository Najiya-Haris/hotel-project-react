import React from 'react'
import Tables from '../../../Components/Tables'
import {Button} from "antd"

function Order() {
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
    }, {
      key: "4",
      title: "status",
      render: (record) => {
        return (
          <>
            <Button className="act">pending</Button>
          </>
        );
      },
    },
  ]

  const tableData = [
    { dish: 'Dish 1', quantity: 2, price: 10, status: 'Active' },
    { dish: 'Dish 2', quantity: 3, price: 15, status: 'Active' },
    { dish: 'Dish 3', quantity: 1, price: 8, status: 'Active' },
   
  ];
  
  return (
   
    <Tables  columns={columns} dataSource={tableData} />
  )

  }
export default Order