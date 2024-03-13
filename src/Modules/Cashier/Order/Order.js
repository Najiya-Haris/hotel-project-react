import React, { useEffect, useState } from "react";
import Tables from "../../../Components/Table/Tables";
import { InputNumber, Button } from "antd";
import axios from "axios";
import config from "../../../config/Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Order() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const navigate = useNavigate();
  const columns = [
    {
      title: "Table Name",
      dataIndex: "tableName",
      key: "tableName",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      key: "4",
      title: "",
      render: (record) => {
        return (
          <>
            <Button className="act" onClick={() => navigate("/billing")}>
              view details
            </Button>
          </>
        );
      },
    },
  ];
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/getReadyToPaymentOrders`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("cash",response);

      setData(response.data.response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return <Tables columns={columns} dataSource={data} />;
}

export default Order;
