import React, { useEffect, useState } from 'react'
import './App.css'
// import { Dropdown, MenuProps, Space, Table, Tag } from 'antd'
// import { ColumnsType } from 'antd/es/table'
import { ConfigProvider, MenuProps, theme } from 'antd'
// import Btn from './components/Btn'
// import { DownOutlined, LineChartOutlined } from '@ant-design/icons'
// import { Line } from 'react-chartjs-2'
// import { implied_volatility } from './utils/test'
// import getDayDifference from './utils/ttm'
import Datatable from './components/Datatable'
import { implied_volatility } from './utils/test';
import getDayDifference from './utils/ttm';
import { ColumnsType } from 'antd/es/table';
import Btn from './components/Btn';

function App() {
  // const [data, setData] = useState<DataType[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [counter, setCounter] = useState<number>(0);
  // const [stockLTP, setStockLTP] = useState<number>(0);
  // const [index, setIndex] = useState<string>("MAINIDX");
  // const [ep, setEp] = useState<string>("ALL");
  // let dataForTable;
  // const [expDateArray, setExpDateArray] = useState<any>([]);
  // const [expDateMap, setExpDateMap] = useState<any>([]);

  // interface DataType {
  //   key: number;
  //   symbol: string;
  //   expiryDate: string;
  //   strikePrice: number;
  //   optionType: string;
  //   LTP: number;
  //   LTQ: number;
  //   totalTradedVolume: number;
  //   bestBid: number;
  //   bestAsk: number;
  //   bestBidQty: number;
  //   bestAskQty: number;
  //   openInterest: number;
  //   timestamp: string;
  //   sequence: number;
  //   prevClosePrice: number;
  //   prevOpenInterest: number;
  //   putExpireDate: string;
  //   putStrikePrice: number;
  //   putLTP: number;
  //   putLTQ: number;
  //   putTotalTradedVolume: number;
  //   putBestBid: number;
  //   putBestAsk: number;
  //   putBestBidQty: number;
  //   putBestAskQty: number;
  //   putOpenInterest: number;
  //   putTimestamp: string;
  //   putSequence: number;
  //   putPrevClosePrice: number;
  //   putPrevOpenInterest: number;
  // }

  // useEffect(() => {
  //   handleGetData();
  // }, [index, ep]);

  // let strikePrice = 0;
  // let strikePriceArray: any = [];

  // const handleGetData = async () => {
  //   setData([]);
  //   setLoading(true);
  //   let response;
  //   if (ep === "ALL") {
  //     response = await fetch(`http://localhost:4000/api/get?symbol=${index}`);
  //   } else {
  //     response = await fetch(
  //       `http://localhost:4000/api/get?symbol=${index}&expiryDate=${ep}`
  //     );
  //   }

  //   const res = await response.json();
  //   //console.log(res.data, "res.data.length");

  //   res.data.map((item: any) => {
  //     // console.log(item.timestamp);
  //     //console.log(item.expiryDate);
  //   });

  //   res.data.map((item: any) => {
  //     strikePriceArray.push(item.strikePrice);
  //   });

  //   strikePriceArray = [...new Set(strikePriceArray)];

  //   res.data.map((item: any) => {
  //     expDateArray.push(item.expiryDate);
  //   });

  //   let tempExpArray = [...new Set(expDateArray)];
  //   //console.log(tempExpArray, "tempExpArray");
  //   const newTemp = tempExpArray.filter((item: any) => {
  //     return item !== undefined;
  //   });

  //   setExpDateArray(newTemp);

  //   let tempExpMap: any = [];
  //   newTemp.map((item: any) => {
  //     let tempObj: any = {};
  //     tempObj = {
  //       label: item,
  //       value: item,
  //       onClick: () => {
  //         setData([]);
  //         setEp(item);
  //       },
  //     };
  //     tempExpMap.push(tempObj);
  //   });
  //   setExpDateMap(tempExpMap);
  //   // res.data
  //   //   .sort(
  //   //     (a: any, b: any) =>
  //   //       parseFloat(a.strikePrice) - parseFloat(b.strikePrice)
  //   //   )
  //   //   // .filter((item: any) => item.symbol == "MAINIDX")
  //   //   .map((item: any) => {
  //   //     if (item.optionType === null) {
  //   //       console.log(item.LTP / 100, "item.LTP");
  //   //       setStockLTP(item.LTP / 100);
  //   //     }
  //   //   });

  //   strikePriceArray.map((item: any) => {
  //     let dataObj: any = {};
  //     res.data
  //       .sort(
  //         (a: any, b: any) =>
  //           parseFloat(a.strikePrice) - parseFloat(b.strikePrice)
  //       )
  //       .map((item2: any) => {
  //         if (item2.strikePrice == null) {
  //           //console.log(item2, "item2");
  //           //console.log(item2.LTP / 100, "item.LTP");
  //           setStockLTP(item2.LTP / 100);
  //         }
  //         if (item2.strikePrice === item && item2.optionType === "CE") {
  //           const iv = implied_volatility(
  //             parseFloat(stockLTP.toString()),
  //             parseFloat(item2.strikePrice.toString()),
  //             getDayDifference(item2.expiryDate),
  //             parseFloat(item2.LTP.toString()),
  //             item2.optionType
  //           );
  //           //console.log(iv, "iv");
  //           dataObj = {
  //             key: Math.random(),
  //             symbol: item2.symbol,
  //             expiryDate: item2.expiryDate,
  //             strikePrice: item2.strikePrice,
  //             optionType: item2.optionType,
  //             LTP: item2.LTP,
  //             LTQ: item2.LTQ,
  //             totalTradedVolume: item2.totalTradedVolume,
  //             bestBid: item2.bestBid,
  //             bestAsk: item2.bestAsk,
  //             bestBidQty: item2.bestBidQty,
  //             bestAskQty: item2.bestAskQty,
  //             openInterest: item2.openInterest,
  //             timestamp: item2.timestamp,
  //             sequence: item2.sequence,
  //             prevClosePrice: item2.prevClosePrice,
  //             prevOpenInterest: item2.prevOpenInterest,
  //             iv: iv,
  //           };
  //         }
  //         if (item2.strikePrice === item && item2.optionType === "PE") {
  //           //console.log(stockLTP, "stockLTP");
  //           const iv = implied_volatility(
  //             stockLTP,
  //             item2.strikePrice,
  //             getDayDifference(item2.expiryDate),
  //             item2.LTP,
  //             item2.optionType
  //           );
  //           //console.log(iv, "iv");
  //           dataObj = {
  //             ...dataObj,
  //             putExpireDate: item2.expiryDate,
  //             strikePrice: item2.strikePrice,
  //             putLTP: item2.LTP,
  //             putLTQ: item2.LTQ,
  //             putTotalTradedVolume: item2.totalTradedVolume,
  //             putBestBid: item2.bestBid,
  //             putBestAsk: item2.bestAsk,
  //             putBestBidQty: item2.bestBidQty,
  //             putBestAskQty: item2.bestAskQty,
  //             putOpenInterest: item2.openInterest,
  //             putTimestamp: item2.timestamp,
  //             putSequence: item2.sequence,
  //             putPrevClosePrice: item2.prevClosePrice,
  //             putPrevOpenInterest: item2.prevOpenInterest,
  //             iv: iv,
  //           };
  //           data.push(dataObj);
  //         }
  //       });
  //     data.push(dataObj);
      
  //   });
  //   setData(data);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   dataForTable = data;
  //   setData(dataForTable);
  // }, [counter, index, ep]);

  // useEffect(() => {}, [data, index, ep]);

  // useEffect(() => {}, [expDateArray]);

  // const callColumns: ColumnsType<DataType> = [
  //   {
  //     title: "",
  //     dataIndex: "",
  //     key: "",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; symbol: any; expiryDate: any; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#a5a5a5" : "transparent",
  //           },
  //         },
  //         children: (
  //           <Btn
  //             strikePrice={record.strikePrice}
  //             symbol={record.symbol}
  //             optionType="CE"
  //             expiryDate={record.expiryDate}
  //           />
  //         ),
  //       };
  //     },
  //   },
  //   {
  //     title: "OI",
  //     dataIndex: "openInterest",
  //     key: "openInterest",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Change in OI",
  //     dataIndex: "openInterest",
  //     key: "openInterest",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Volume",
  //     dataIndex: "totalTradedVolume",
  //     key: "totalTradedVolume",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },

  //   {
  //     title: "LTP",
  //     dataIndex: "LTP",
  //     key: "LTP",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "IV",
  //     dataIndex: "iv",
  //     key: "iv",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },

  //   {
  //     title: "BID QTY",
  //     dataIndex: "bestBidQty",
  //     key: "bestBidQty",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "BID",
  //     dataIndex: "bestBid",
  //     key: "bestBid",
  //     align: "center",

  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Ask",
  //     dataIndex: "bestAsk",
  //     key: "bestAsk",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "ASK QTY",
  //     dataIndex: "bestAskQty",
  //     key: "bestAskQty",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "STRIKE",
  //     dataIndex: "strikePrice",
  //     key: "strikePrice",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "transparent" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "ASK QTY",
  //     dataIndex: "putBestAskQty",
  //     key: "putBestAskQty",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Ask",
  //     dataIndex: "putBestAsk",
  //     key: "putBestAsk",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "BID",
  //     dataIndex: "putBestBid",
  //     key: "putBestBid",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "BID QTY",
  //     dataIndex: "putBestBidQty",
  //     key: "putBestBidQty",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "CHNG",
  //     dataIndex: "chng",
  //     key: "chng",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "LTP",
  //     dataIndex: "putLTP",
  //     key: "putLTP",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "IV",
  //     dataIndex: "iv",
  //     key: "iv",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Volume",
  //     dataIndex: "putTotalTradedVolume",
  //     key: "putTotalTradedVolume",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "Change in OI",
  //     dataIndex: "openInterest",
  //     key: "openInterest",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "OI",
  //     dataIndex: "putOpenInterest",
  //     key: "putOpenInterest",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP < record.strikePrice ? "#202838" : "transparent",
  //           },
  //         },
  //         children: <>{text}</>,
  //       };
  //     },
  //   },
  //   {
  //     title: "",
  //     dataIndex: "",
  //     key: "",
  //     align: "center",
  //     render(text: any, record: { strikePrice: number; putStrikePrice: any; symbol: any; putExpireDate: any; }) {
  //       return {
  //         props: {
  //           style: {
  //             background:
  //               stockLTP > record.strikePrice ? "#a5a5a5" : "transparent",
  //           },
  //         },
  //         children: (
  //           <Btn
  //             strikePrice={record.putStrikePrice}
  //             symbol={record.symbol}
  //             optionType="PE"
  //             expiryDate={record.putExpireDate}
  //           />
  //         ),
  //       };
  //     },
  //   },
  // ];

  // const items: MenuProps["items"] = [
  //   {
  //     label: "MAINIDX",
  //     key: "1",
  //     onClick: () => {
  //       setIndex("MAINIDX");
  //     },
  //   },
  //   {
  //     label: "FINANCIALS",
  //     key: "2",
  //     onClick: () => {
  //       setData([]);
  //       setIndex("FINANCIALS");
  //     },
  //   },
  //   {
  //     label: "ALLBANKS",
  //     key: "3",
  //     onClick: () => {
  //       setData([]);
  //       setIndex("ALLBANKS");
  //     },
  //   },
  //   {
  //     label: "MIDCAPS",
  //     key: "4",
  //     onClick: () => {
  //       setData([]);
  //       setIndex("MIDCAPS");
  //     },
  //   },
  // ];

  // const expdates: MenuProps["items"] = [
  //   ...[
  //     {
  //       label: "ALL",
  //       key: 0,
  //       onClick: () => {
  //         setEp("ALL");
  //       },
  //     },
  //   ],
  //   ...expDateMap,
  // ];

  return (
    <>
      <ConfigProvider
        theme={
          {
            algorithm: theme.darkAlgorithm,
          }
        }
      >
        {/* <Btn /> */}
        <div className="data-table">
        <Datatable />
        </div>
      </ConfigProvider>
    </>
  )
}

export default App
