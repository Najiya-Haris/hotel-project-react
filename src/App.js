import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Layouts from "./Layout/Layouts";
import {
  cashierMenuItems,
  chefMenuItems,
  managerMenuItems,
  supplierMenuItems,
} from "./Navigations/Navigations";
import { Navigate } from "react-router-dom";
import Cheflist from "../src/Modules/Manager/employlist/Cheflist";
import Tables from "./Components/Table/Tables";
import SupplierList from "../src/Modules/Manager/employlist/SupplierList";
import ManagerDashboard from "./Modules/Manager/ManagerDashboard/ManagerDashboard";
import { useSelector } from "react-redux";
import CashierList from "./Modules/Manager/employlist/CashierList";
import ManagerProfile from "./Modules/Manager/Profile/ManagerProfile";
import ChefDashboard from "./Modules/Chef/ChefDashboard/ChefDashboard";
import SupplierDashboard from "./Modules/Supplier/SupplierDashboard/SupplierDashboard";
import CashierDashboard from "./Modules/Cashier/CashierDashboard/CashierDashboard";
import Mydishes from "./Modules/Chef/MyDish/MyDishes";
import SingleFood from "./Modules/Chef/Single/SingleFood";
import TableData from "./Modules/Supplier/TableData/TableData";
import AllDishes from "./Modules/Manager/Foodlist/AllDishes";
import OrderList from "./Modules/Chef/OrderList/OrdeList";
import TodaysMenu from "./Modules/Supplier/TodaysMenu/TodaysMenu";
import PaymentHistory from "./Modules/Manager/Payment/PaymentHistory";
import TableView from "./Modules/Manager/TableView/TableView";
import DailyDishes from "./Modules/Chef/DailyDish/DailyDishes";
import ChefMenu from "./Modules/Chef/ChefMenu/ChefMenu";
import Order from "./Modules/Cashier/Order/Order";
import Forget from "./Pages/ForgetPage/Forget";


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
 else if (userDetails && userDetails.userType === "cashier") {
  menuItems = cashierMenuItems;
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget/>} />
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
                  <Route path="/orderlist" element={<OrderList/>} />
                  <Route path="/alldishes" element={<AllDishes/>} />
                  <Route path="/order" element={<Order/>} />
                  <Route path="/todaysmenu" element={<TodaysMenu/>} />
                  <Route path="/payment" element={<PaymentHistory/>} />
                  <Route path="/menu" element={<ChefMenu/>} />
                  <Route path="/tableview" element={<TableView/>} />
                  <Route path="/dailydish" element={<DailyDishes/>} />
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
