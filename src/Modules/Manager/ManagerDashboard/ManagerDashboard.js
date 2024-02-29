import React from 'react'
import { useSelector } from "react-redux";
function ManagerDashboard() {
    const userDetails = useSelector((state) => state.user.loginUserDetails);
  
  return (
    <div>
managerdashboard      

    </div>
  )
}

export default ManagerDashboard