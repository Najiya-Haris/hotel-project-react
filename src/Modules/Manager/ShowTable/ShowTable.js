import React, { useEffect, useState } from "react";
import { message, Button, Input, Upload, Modal, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import tableimage from "../../../assets/table.svg";
import tableimage2 from "../../../assets/tables.svg";
function ShowTable() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);

  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const [tableData, setTableData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/manager/viewTable`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("reeee", response);
      setTableData(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="tabledatas mt-6 w-[900px] h-[400px]">
      {tableData.map((tableItem, index) => (
        <div key={index} className="table-item">
            {tableItem.status==="selected" ? (
                 <img src={tableimage2} />
            ):(
                <img src={tableimage} />
            )
        }
          
          <div className="table-name ml-12">{tableItem.name}</div>
        </div>
      ))}
    </div>
  );
}

export default ShowTable;
