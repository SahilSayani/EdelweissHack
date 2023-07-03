import React, { useEffect, useState } from "react";
import "./App.css";
import { Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Btn from "./components/Btn";
import { data } from "./components/Linechart";
function App() {
  const [callData, setCallData] = useState<CallDataType[]>([]);
  const [putData, setPutData] = useState<PutDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let dataForTable;

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/get");
    const res = await response.json();
    console.log(res.data);
    res.data.map((item: any) => {
      // console.log(item);
      callData.push({
        key: Math.random(),
        symbol: item.symbol,
        expiryDate: item.expiryDate,
        strikePrice: item.strikePrice,
        optionType: item.optionType,
        LTP: item.LTP,
        LTQ: item.LTQ,
        totalTradedVolume: item.totalTradedVolume,
        bestBid: item.bestBid,
        bestAsk: item.bestAsk,
        bestBidQty: item.bestBidQty,
        bestAskQty: item.bestAskQty,
        openInterest: item.openInterest,
        timestamp: item.timestamp,
        sequence: item.sequence,
        prevClosePrice: item.prevClosePrice,
        prevOpenInterest: item.prevOpenInterest,
      });
    });
    console.log(callData, "calldataa");
    setCallData(callData);
    setLoading(false);
  };

  useEffect(() => {
    dataForTable = callData;
  }, [callData]);

  interface CallDataType {
    key: number;
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

  interface PutDataType {
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

  const callColumns: ColumnsType<CallDataType> = [
    {
      title: "OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
      render: (text, record) => <span>{record.openInterest}</span>,
    },
    {
      title: "Change in OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
      render: (text, record) => (
        <span>{record.openInterest - record.prevOpenInterest}</span>
      ),
    },
    {
      title: "Volume",
      dataIndex: "totalTradedVolume",
      key: "totalTradedVolume",
      align: "center",
      render: (text, record) => <span>{record.totalTradedVolume}</span>,
    },

    {
      title: "LTP",
      dataIndex: "LTP",
      key: "LTP",
      align: "center",
      render: (text, record) => <span>{record.LTP}</span>,
    },

    {
      title: "BID QTY",
      dataIndex: "bestBidQty",
      key: "bestBidQty",
      align: "center",
      render: (text, record) => <span>{record.bestBidQty}</span>,
    },
    {
      title: "BID",
      dataIndex: "bestBid",
      key: "bestBid",
      align: "center",

      render: (text, record) => <span>{record.bestBid}</span>,
    },
    {
      title: "Ask",
      dataIndex: "bestAsk",
      key: "bestAsk",
      align: "center",
      render: (text, record) => <span>{record.bestAsk}</span>,
    },
    {
      title: "ASK QTY",
      dataIndex: "bestAskQty",
      key: "bestAskQty",
      align: "center",
      render: (text, record) => <span>{record.bestAskQty}</span>,
    },
    {
      title: "STRIKE",
      dataIndex: "strikePrice",
      key: "strikePrice",
      align: "center",
      render: (text, record) => <span>{record.strikePrice}</span>,
    },
  ];

  const putColumns: ColumnsType<PutDataType> = [
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
      title: "Ask",
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
  ];

  return (
    <>
      <Btn />
      <div className="table-parent">
        <div className="table-header">
          <div>
            <span>Calls</span>
          </div>
          <div>
            <span>Puts</span>
          </div>
        </div>
        <div className="two-tables">
          <Table
            columns={callColumns}
            loading={loading}
            dataSource={dataForTable}
            className="table"
          />
          <Table
            columns={putColumns.reverse()}
            dataSource={putData}
            pagination={false}
            className="table"
          />
        </div>
      </div>
    </>
  );
}

export default App;
