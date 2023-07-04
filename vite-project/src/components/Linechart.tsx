import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

interface LineChartProps {
  symbol: string;
  expiryDate: string;
  optionType: string;
  strikePrice: number;
}

export function Linechart({
  symbol,
  expiryDate,
  optionType,
  strikePrice,
}: LineChartProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [ltp, setLtp] = useState<any>();
  const [callLtp, setcallLtp] = useState<any>();
  const [dates, setDates] = useState<any>();


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Market Chart",
      },
    },
  };

  useEffect(() => {
    handleChartData();
  }, []);

  const handleChartData = async () => {
    console.log(symbol, expiryDate, optionType, strikePrice, "lcparams");
    const response = await fetch(
      `http://localhost:4000/api/get/date?symbol=${symbol}&expiryDate=${expiryDate}&optionType=PE&strikePrice=${strikePrice}`
    );
    const response1 = await fetch(
      `http://localhost:4000/api/get/date?symbol=${symbol}&expiryDate=${expiryDate}&optionType=CE&strikePrice=${strikePrice}`
    );
    const res = await response.json();
    const res1  = await response1.json();

    console.log(res.data, "lc");
    const arr:any =[];
    const arr1:any =[];
    const arr2: any=[]; 
    res.data.map((val: any)=>{
      arr.push(val.LTP);
      arr2.push(val.timestamp.slice(4, 10));
    })
    res1.data.map((val: any)=>{
      arr1.push(val.LTP);
    })
    setLtp(arr);
    setcallLtp(arr1);
    setDates(arr2);
  };

  const labels = dates;

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ltp,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
      },
      {
        label: "Dataset 2",
        data: callLtp,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.2,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
