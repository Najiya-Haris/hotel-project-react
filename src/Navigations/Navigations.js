// navigation.js
import React from "react";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
export const managerMenuItems = [
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "Employee List",
    children: [
      { key: 1, label: "chef", link: "/cheflist" },
      { key: 2, label: "supplier", link: "/supplierlist" },
      { key: 3, label: "cashier", link: "/cashierlist" },
    ],
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "Food",
    children: [
      { key: 4, label: "All dishes", link: "alldishes" },
     
    ],
  },
  {
    key: "sub3",
    icon: <LaptopOutlined />,
    label: "Orders",
    children: [
      { key: 4, label: "orderlist", link: "orderlistmanager" },
      { key: 4, label: "tableview", link: "tableviewmanager" },
    ],
  },
  {
    key: "sub4",
    icon: <NotificationOutlined />,
    label: "Payment History",
    children: [{ key: 4, label: "payment", link: "payment" }],
  },

  {
    key: "sub5",
    icon: <NotificationOutlined />,
    label: "Todaysmenu",
    children: [{ key: 4, label: "todaysmenu", link: "viewTodaysMenu" }],
  },
];

export const chefMenuItems = [
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "Food",
    children: [
      { key: 1, label: "my dishes", link: "/mydishes" },
      { key: 2, label: "daily dishes",link:"/dailydish" },
  
    ],
  },

  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "Todaysmenu",
    children: [
      { key: 4, label: "todays menu",link: "TodaysMenuchef"},
  
    ],
  },
  {
    key: "sub3",
    icon: <LaptopOutlined />,
    label: "order",
    children: [
      { key: 4, label: "orderlist",link: "orderlistchef"},
      { key: 4, label: "orderhistory",link: "orderhistory"},
  
    ],
  },
];

export const supplierMenuItems = [
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "food details",
    children: [{ key: 3, label: "todays dishes", link: "/todaysmenu" }],
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "orderlist",
    children: [{ key: 4, label: "orderlist", link: "/orderlist" }],
  },
  {
    key: "sub3",
    icon: <LaptopOutlined />,
    label: "table",
    children: [{ key: 4, label: "view table", link: "/table" }],
  },
];
export const cashierMenuItems = [

  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "order",
    children: [{ key: 4, label: "orderlist", link: "/billing" }],
  },
  {
    key: "sub3",
    icon: <LaptopOutlined />,
    label: "payment",
    children: [{ key: 4, label: "paymrnt", link: "/payment" }],
  },
];

