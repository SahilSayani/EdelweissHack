import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    const response = await fetch("http://localhost:4000/api/get");
    const res = await response.json();
    console.log(res.data);
  };

  interface DataType {
    key: React.Key;
    symbol: string;
    expiryDate: string;
    strikePrice: number;
    optionType: string;
    LTP: number;
    LTQ: number;
    totalTradedVolume: number;
    bestBid: number;
    bestAsk: number;
    bestBidQty: number;
    bestAskQty: number;
    openInterest: number;
    timestamp: string;
    sequence: number;
    prevClosePrice: number;
    prevOpenInterest: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
    },
    {
      title: "Change in OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
    },
    {
      title: "Volume",
      dataIndex: "totalTradedVolume",
      key: "totalTradedVolume",
      align: "center",
    },
    {
      title: "IV",
      dataIndex: "iv",
      key: "iv",
      align: "center",
    },
    {
      title: "LTP",
      dataIndex: "LTP",
      key: "LTP",
      align: "center",
    },
    {
      title: "CHNG",
      dataIndex: "chng",
      key: "chng",
      align: "center",
    },
    {
      title: "BID QTY",
      dataIndex: "bestBidQty",
      key: "bestBidQty",
      align: "center",
    },
    {
      title: "BID",
      dataIndex: "bestBid",
      key: "bestBid",
      align: "center",
    },
    {
      title: "bestAsk",
      dataIndex: "bestAsk",
      key: "bestAsk",
      align: "center",
    },
    {
      title: "ASK QTY",
      dataIndex: "bestAskQty",
      key: "bestAskQty",
      align: "center",
    },
    {
      title: "STRIKE",
      dataIndex: "strikePrice",
      key: "strikePrice",
      align: "center",
    },
  ];

  const data: DataType[] = [];

  return (
    <>
      <div className="table-parent">
        <div className="table-header">
          <div>
            <span>Calls</span>
          </div>
          <div>
            <span>Puts</span>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="table"
        />
      </div>
    </>
  );
}

export default App;
