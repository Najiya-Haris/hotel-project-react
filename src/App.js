import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Layouts from "./Layouts";
import {
  chefMenuItems,
  managerMenuItems,
  supplierMenuItems,
} from "./Navigations/Navigations";
import { Navigate } from "react-router-dom";
import Cheflist from "../src/Modules/Manager/employlist/Cheflist";
import Tables from "./Components/Tables";
import SupplierList from "../src/Modules/Manager/employlist/SupplierList";
import ManagerDashboard from "./Modules/Manager/ManagerDashboard";
import { useSelector } from "react-redux";
import CashierList from "./Modules/Manager/employlist/CashierList";
import ManagerProfile from "./Modules/Manager/ManagerProfile";
import ChefDashboard from "./Modules/Chef/ChefDashboard";
import SupplierDashboard from "./Modules/Supplier/SupplierDashboard";
import CashierDashboard from "./Modules/Cashier/CashierDashboard";
import Mydishes from "./Modules/Chef/MyDishes";
import SingleFood from "./Modules/Chef/SingleFood";
import TableData from "./Modules/Supplier/TableData/TableData";
import Order from "./Modules/Supplier/Orderdetails/Order";
import AllDishes from "./Modules/Manager/Foodlist/AllDishes";
import OrderList from "./Modules/Chef/OrdeList";
import TodaysMenu from "./Modules/Supplier/TodaysMenu/TodaysMenu";
import PaymentHistory from "./Modules/Manager/Payment/PaymentHistory";


function App() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  let menuItems;
  console.log("userDetails", userDetails);

  if (userDetails && userDetails.userType === "manager") {
    menuItems = managerMenuItems;
  } else if (userDetails && userDetails.userType === "chef") {
    menuItems = chefMenuItems;
  } else if (userDetails && userDetails.userType === "supplier") {
    menuItems = supplierMenuItems;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            userDetails ? (
              <Layouts menuItems={menuItems}>
                <Routes>
                  <Route path="/manager" element={<ManagerDashboard />} />
                  <Route path="/cheflist" element={<Cheflist />} />
                  <Route path="/supplierlist" element={<SupplierList />} />
                  <Route path="/cashierlist" element={<CashierList />} />
                  <Route path="/managerprofile" element={<ManagerProfile />} />
                  <Route path="/chef" element={<ChefDashboard />} />
                  <Route path="/supplier" element={<SupplierDashboard />} />
                  <Route path="/cashier" element={<CashierDashboard />} />
                  <Route path="/mydishes" element={<Mydishes />} />
                  <Route path="/single" element={<SingleFood/>} />
                  <Route path="/table" element={<TableData/>} />
                  <Route path="/orderlist" element={<Order/>} />
                  <Route path="/alldishes" element={<AllDishes/>} />
                  <Route path="/order" element={<OrderList/>} />
                  <Route path="/todaysmenu" element={<TodaysMenu/>} />
                  <Route path="/payment" element={<PaymentHistory/>} />
                </Routes>
              </Layouts>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
