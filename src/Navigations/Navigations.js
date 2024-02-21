// navigation.js
import React from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export const managerMenuItems = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: 'Employee List',
    children: [
      { key: 1, label: 'chef' ,link:"/cheflist" },
      { key: 2, label: 'supplier',link:"/supplierlist" },
      { key: 3, label: 'cashier',link:"/cashierlist" },
      
    ],
  },
  {
    key: 'sub2',
    icon: <LaptopOutlined />,
    label: 'Food',
    children: [
      { key: 4, label: 'All Dishes,link:"/allfood" ' },
      { key: 5, label: 'Daily dishes' },
    ],
  },
  {
    key: 'sub3',
    icon: <NotificationOutlined />,
    label: 'Payment History',
    children: [
     
    ],
  },
];

export const chefMenuItems = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Food',
        children: [
          { key: 1, label: 'my dishes',link:"/mydishes" },
          { key: 2, label: 'daily dishes' },
          { key: 3, label: 'todays dishes' },
          
        ],
      },
      {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'orderlist',
        children: [
          { key: 4, label: 'DAILY DISHES' },
          { key: 5, label: 'Todays dish' },
        ],
      },
     
];

export const supplierMenuItems = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'food details',
        children: [
       
          { key: 3, label: 'todays dishes',link:"/todaysmenu" },
          
        ],
      },
      {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'orderlist',
        children: [
          { key: 4, label: 'orderlist',link:"/orderlist" },
        
        ],
      },
      {
        key: 'sub3',
        icon: <LaptopOutlined />,
        label: 'table',
        children: [
          { key: 4, label: 'view table',link:"/table" },
          
        ],
      },
     
];


