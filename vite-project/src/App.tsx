import React, { useEffect, useState } from "react";
import "./App.css";
import { Dropdown, MenuProps, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ConfigProvider, theme } from 'antd';
import Btn from "./components/Btn";
import { data } from "./components/Linechart";
import { DownOutlined } from "@ant-design/icons";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [stockLTP, setStockLTP] = useState<number>(0);
  const [index, setIndex] = useState<string>("MAINIDX");
  const [ep, setEp] = useState<string>("6JUL23");
  let dataForTable;

  interface DataType {
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
    putExpireDate: string;
    putStrikePrice: number;
    putLTP: number;
    putLTQ: number;
    putTotalTradedVolume: number;
    putBestBid: number;
    putBestAsk: number;
    putBestBidQty: number;
    putBestAskQty: number;
    putOpenInterest: number;
    putTimestamp: string;
    putSequence: number;
    putPrevClosePrice: number;
    putPrevOpenInterest: number;
  }

  useEffect(() => {
    handleGetData();
  }, [index, ep]);

  let strikePrice = 0;
  let strikePriceArray: any = [];

  const handleGetData = async () => {
    setData([]);
    setLoading(true);
    const response = await fetch(
      `http://localhost:4000/api/get?symbol=${index}&expiryDate=${ep}`
    );
    const res = await response.json();
    console.log(res.data.length, "res.data.length");

    res.data.map((item: any) => {
      // console.log(item.timestamp);
      console.log(item.expiryDate);
    });

    res.data.map((item: any) => {
      strikePriceArray.push(item.strikePrice);
    });

    strikePriceArray = [...new Set(strikePriceArray)];

    res.data
      .sort(
        (a: any, b: any) =>
          parseFloat(a.strikePrice) - parseFloat(b.strikePrice)
      )
      // .filter((item: any) => item.symbol == "MAINIDX")
      .map((item: any) => {
        if (item.optionType === null) {
          console.log(item.LTP / 100, "item.LTP");
          setStockLTP(item.LTP / 100);
        }
      });

    strikePriceArray.map((item: any) => {
      let dataObj: any = {};
      res.data
        .sort(
          (a: any, b: any) =>
            parseFloat(a.strikePrice) - parseFloat(b.strikePrice)
        )
        .map((item2: any) => {
          if (item2.strikePrice === item && item2.optionType === "CE") {
            dataObj = {
              key: Math.random(),
              symbol: item2.symbol,
              expiryDate: item2.expiryDate,
              strikePrice: item2.strikePrice,
              optionType: item2.optionType,
              LTP: item2.LTP,
              LTQ: item2.LTQ,
              totalTradedVolume: item2.totalTradedVolume,
              bestBid: item2.bestBid,
              bestAsk: item2.bestAsk,
              bestBidQty: item2.bestBidQty,
              bestAskQty: item2.bestAskQty,
              openInterest: item2.openInterest,
              timestamp: item2.timestamp,
              sequence: item2.sequence,
              prevClosePrice: item2.prevClosePrice,
              prevOpenInterest: item2.prevOpenInterest,
            };
          }
          if (item2.strikePrice === item && item2.optionType === "PE") {
            dataObj = {
              ...dataObj,
              putExpireDate: item2.expiryDate,
              strikePrice: item2.strikePrice,
              putLTP: item2.LTP,
              putLTQ: item2.LTQ,
              putTotalTradedVolume: item2.totalTradedVolume,
              putBestBid: item2.bestBid,
              putBestAsk: item2.bestAsk,
              putBestBidQty: item2.bestBidQty,
              putBestAskQty: item2.bestAskQty,
              putOpenInterest: item2.openInterest,
              putTimestamp: item2.timestamp,
              putSequence: item2.sequence,
              putPrevClosePrice: item2.prevClosePrice,
              putPrevOpenInterest: item2.prevOpenInterest,
            };
            data.push(dataObj);
          }
        });
      data.push(dataObj);
    });
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    dataForTable = data;
    setData(dataForTable);
  }, [counter, index, ep]);

  useEffect(() => {}, [data, index, ep]);

  const callColumns: ColumnsType<DataType> = [
    {
      title: "OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Change in OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Volume",
      dataIndex: "totalTradedVolume",
      key: "totalTradedVolume",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },

    {
      title: "LTP",
      dataIndex: "LTP",
      key: "LTP",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },

    {
      title: "BID QTY",
      dataIndex: "bestBidQty",
      key: "bestBidQty",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "BID",
      dataIndex: "bestBid",
      key: "bestBid",
      align: "center",

      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Ask",
      dataIndex: "bestAsk",
      key: "bestAsk",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "ASK QTY",
      dataIndex: "bestAskQty",
      key: "bestAskQty",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "STRIKE",
      dataIndex: "strikePrice",
      key: "strikePrice",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP > record.strikePrice ? "transparent" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "ASK QTY",
      dataIndex: "putBestAskQty",
      key: "putBestAskQty",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Ask",
      dataIndex: "putBestAsk",
      key: "putBestAsk",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "BID",
      dataIndex: "putBestBid",
      key: "putBestBid",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "BID QTY",
      dataIndex: "putBestBidQty",
      key: "putBestBidQty",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "CHNG",
      dataIndex: "chng",
      key: "chng",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "LTP",
      dataIndex: "putLTP",
      key: "putLTP",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "IV",
      dataIndex: "iv",
      key: "iv",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Volume",
      dataIndex: "putTotalTradedVolume",
      key: "putTotalTradedVolume",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "Change in OI",
      dataIndex: "openInterest",
      key: "openInterest",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
    {
      title: "OI",
      dataIndex: "putOpenInterest",
      key: "putOpenInterest",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                stockLTP < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{text}</>,
        };
      },
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "MAINIDX",
      key: "1",
      onClick: () => {
        setIndex("MAINIDX");
      },
    },
    {
      label: "FINANCIALS",
      key: "2",
      onClick: () => {
        setData([]);
        setIndex("FINANCIALS");
      },
    },
    {
      label: "ALLBANKS",
      key: "3",
      onClick: () => {
        setData([]);
        setIndex("ALLBANKS");
      },
    },
    {
      label: "MIDCAPS",
      key: "4",
      onClick: () => {
        setData([]);
        setIndex("MIDCAPS");
      },
    },
  ];

  const expdates: MenuProps["items"] = [
    {
      label: "6JUL23",
      key: "1",
      onClick: () => {
        setData([]);
        setEp("6JUL23");
      },
    },
    {
      label: "27JUL23",
      key: "2",
      onClick: () => {
        setData([]);
        setEp("27JUL23");
      },
    },
    {
      label: "31AUG23",
      key: "3",
      onClick: () => {
        setData([]);
        setEp("31AUG23");
      },
    },
    {
      label: "28SEP23",
      key: "4",
      onClick: () => {
        setData([]);
        setEp("28SEP23");
      },
    },
    {
      label: "26OCT23",
      key: "4",
      onClick: () => {
        setData([]);
        setEp("26OCT23");
      },
    },
  ];

  return (
    <>
    <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
      {/* <Btn /> */}
      <div className="table-parent">
        <Dropdown menu={{ items }}>
          <Space>
            {index}
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items: expdates }}>
          <Space>
            {ep}
            <DownOutlined />
          </Space>
        </Dropdown>
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
            dataSource={[...data]}
            className="table"
            scroll={{ x: 1500, y: 500 }}
            // pagination={false}
          />
        </div>
      </div>
      </ConfigProvider>
    </>
  );
}

export default App;
