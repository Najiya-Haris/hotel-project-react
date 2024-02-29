import React, { useState, useEffect } from "react";
import tableimage from "../../../assets/table.svg";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import {message} from "antd"
function TableView() {
  const [tableData, setTableData] = useState([]);
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/viewTable`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("res",response);
        if(response.isSuccess){
            setTableData(response.data.response);
        }else{
            message.error("ssfaf")
        }

        // setData(response.data.response.data.chefs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
 

  return (
    <div>
      <div className="tabledatas mt-6 w-[900px] h-[400px]">
        {tableData.map((tableItem, index) => (
          <div key={index} className="table-item">
            <img src={tableimage} alt={`Table ${index + 1}`} />
            <div className="table-name ml-12">{tableItem.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableView;
