import React, { useEffect, useState } from "react";
import { Dropdown, MenuProps, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ConfigProvider, theme } from "antd";
import Btn from "../components/Btn";
import { DownOutlined, LineChartOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import { implied_volatility } from "../utils/test";
import getDayDifference from "../utils/ttm";
import { retinaScale } from "chart.js/helpers";

function Datatable() {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [finalData, setFinalData] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [stockLTP, setStockLTP] = useState<number>(0);
  const [previousClose, prevClose] = useState<number>(0);
  const [index, setIndex] = useState<string>("MAINIDX");
  const [ep, setEp] = useState<string>("default");
  const [expDateMap, setExpDateMap] = useState<any>([]);
  const [expDateArray, setExpDateArray] = useState<any>([]);
  const [expdates, setExpdates]= useState<any>([]);

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
  // let strikePrice = 0;
  // let strikePriceArray: any = [];

  const handleGetData = async () => {
    setData([]);
    setLoading(true);
    const response = await fetch(`http://localhost:4000/api/get?symbol=${index}`);
    const res = await response.json();
    setData(res.data);
    const tmpExpDate: Array<string>=[];
    res.data.forEach((val: any)=>{
      if(!tmpExpDate.includes(val.expiryDate) && val.expiryDate){
        tmpExpDate.push(val.expiryDate);
      }
      if(!val.strikePrice){
        setStockLTP(val.LTP);
      }
    });
    res.data= res.data.filter((val: any) => {
      if (val.optionType !== "XX") {
        return false;
      }
      return true;
    });
    res.data.shift();
    setExpDateMap(tmpExpDate);
    setLoading(false);
  };
  useEffect(()=>{
    console.log(stockLTP, 'testLTP');
  },[stockLTP])
  useEffect(() => {
    const arr = data.filter((val)=>{
      if(val.expiryDate==ep){
        return val;
      }
    })
    setFilteredData(arr);
    setData(arr);
    }, [ep]);

  useEffect(() => {
    handleGetData();
    setEp('default');
  }, [index]);

  useEffect(()=>{
    let prevST=-1;
    let rowObj ={};
    const rows=[];
    data.forEach(val=>{
      if(val.strikePrice!=prevST && Object.keys(rowObj).length){
          rows.push(rowObj);
          rowObj={};
          prevST=val.strikePrice;
      }
      if(val.optionType=='PE'){
        let IV: number= parseFloat(implied_volatility(
          parseFloat(stockLTP.toString()),
          parseFloat(val.strikePrice.toString()),
          getDayDifference(val.expiryDate),
          parseFloat(val.LTP.toString()),
          val.optionType
        ).toFixed(2));
        if(IV>100){
          IV=-1;
        }
        rowObj={
          ...rowObj,
          symbol: val.symbol,
          key: Math.random(),
          strikePrice: val.strikePrice,
          expireDate: val.expiryDate,
          putLTP: val.LTP/100,
          putLTQ: val.LTQ,
          putIv : IV<0?'-':IV,
          putChng: (val.LTP-val.prevClosePrice)/100,
          putchangeopenInterest: val.openInterest-val.prevOpenInterest,
          putTotalTradedVolume: val.totalTradedVolume?val.totalTradedVolume: 0,
          putBestBid: val.bestBid/100,
          putBestAsk: val.bestAsk/100,
          putBestBidQty: val.bestBidQty,
          putBestAskQty: val.bestAskQty,
          putOpenInterest: val.openInterest,
          putTimestamp: val.timestamp,
          putSequence: val.sequence,
          putPrevClosePrice: val.prevClosePrice,
          putPrevOpenInterest: val.prevOpenInterest,
        }
      }
      else if(val.optionType=='CE'){
        let IV: number= parseFloat(implied_volatility(
          parseFloat(stockLTP.toString()),
          parseFloat(val.strikePrice.toString()),
          getDayDifference(val.expiryDate),
          parseFloat(val.LTP.toString()),
          val.optionType
        ).toFixed(2));
        if(IV>100){
          IV=-1;
        }
        rowObj={
            ...rowObj,
            key: Math.random(),
            symbol: val.symbol,
            expiryDate: val.expiryDate,
            strikePrice: val.strikePrice,
            optionType: val.optionType,
            LTP: val.LTP/100,
            LTQ: val.LTQ,
            iv : IV<0?'-':IV,
            chng: (val.LTP-val.prevClosePrice)/100,
            changeopenInterest: val.openInterest-val.prevOpenInterest,
            totalTradedVolume: val.totalTradedVolume?val.totalTradedVolume: '0',
            bestBid: val.bestBid/100,
            bestAsk: val.bestAsk/100,
            bestBidQty: val.bestBidQty,
            bestAskQty: val.bestAskQty,
            openInterest: val.openInterest,
            timestamp: val.timestamp,
            sequence: val.sequence,
            prevClosePrice: val.prevClosePrice,
            prevOpenInterest: val.prevOpenInterest,
        }
      }
    });
    if(Object.keys(rowObj).length){
          rows.push(rowObj);
          rowObj={};
      }
      console.log(rows);
      setFinalData([...rows])
  },[filteredData])
  //setInterval(handleGetData, 30000);

  useEffect(()=>{
    console.log(stockLTP);
  },[stockLTP])

  useEffect(()=>{
    if (expDateMap && expDateMap.length) {
      const newExpdates = [
        ...expDateMap,
      ];
      setExpdates(newExpdates);
    }
  },[expDateMap])

  useEffect(()=>{
    if(expdates && expdates.length){
      setEp(expdates[0] as string);
    }
  },[expdates]);

  const callColumns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: (
            <Btn
              strikePrice={record.strikePrice}
              symbol={record.symbol}
              optionType="CE"
              expiryDate={record.expiryDate}
            />
          ),
        };
      },
    },
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
        };
      },
    },
    {
      title: "Change in OI",
      dataIndex: "changeopenInterest",
      key: "changeopenInterest",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
              color: "white",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
        };
      },
    },
    {
      title: "CHNG",
      dataIndex: "chng",
      key: "putChng",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
        };
      },
    },
    {
      title: "IV",
      dataIndex: "putIv",
      key: "putIv",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
        };
      },
    },
    {
      title: "Change in OI",
      dataIndex: "putchangeopenInterest",
      key: "putchangeopenInterest",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
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
                (stockLTP/100) < record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: <>{!text?'-':text}</>,
        };
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render(text, record) {
        return {
          props: {
            style: {
              background:
                (stockLTP/100) > record.strikePrice ? "#202838" : "transparent",
            },
          },
          children: (
            <Btn
              strikePrice={record.strikePrice}
              symbol={record.symbol}
              optionType="PE"
              expiryDate={record.expireDate}
            />
          ),
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

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm,theme.compactAlgorithm],
        }}
      >
        {/* <Btn /> */}
        <div className="table-parent">
          <div className="dropdown-options">
          <div className="dropdown-block">
          <Dropdown menu={{ items }}>
            <Space>
              {index}
              <DownOutlined />
            </Space>
          </Dropdown>
          </div>
          <div className="dropdown-block">
          <Dropdown menu={{ items: expdates }}>
            <Space>
              {ep}
              <DownOutlined />
            </Space>
          </Dropdown>
          </div>
          </div>
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
              dataSource={[...finalData]}
              className="table"
              scroll={{ x: 1500, y: 500 }}
              pagination={false}
              size="small"
            />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
}

export default Datatable;
