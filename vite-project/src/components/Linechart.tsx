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
import React, { useEffect } from "react";

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
      `http://localhost:4000/api/get/date?symbol=${symbol}&expiryDate=${expiryDate}&optionType=${optionType}&strikePrice=${strikePrice}`
    );
    const res = await response.json();
    console.log(res.data, "lc");
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [2, 9, 8, 8, 6, 5, 4],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
