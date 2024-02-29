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
      { key: 5, label: "Daily dishes" },
    ],
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "TableData",
    children: [{ key: 4, label: "tableinfo", link: "tableview" }],
  },
  {
    key: "sub3",
    icon: <NotificationOutlined />,
    label: "Payment History",
    children: [],
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
      { key: 3, label: "todays dishes",link:"/menu" },
    ],
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "orderlist",
    children: [
      { key: 4, label: "order",link: "orderlist"},
      { key: 5, label: "Todays dish" },
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
    key: "sub1",
    icon: <UserOutlined />,
    label: "tableview",
    children: [{ key: 3, label: "tabledetails", link: "/tableview" }],
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: "order",
    children: [{ key: 4, label: "orderlist", link: "/order" }],
  },
  {
    key: "sub3",
    icon: <LaptopOutlined />,
    label: "payment",
    children: [{ key: 4, label: "paymrnt", link: "/payment" }],
  },
];

