import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ totalSalesCash, totalSalesCredit, totalSalesMobileBanking }) => {
  const data = {
    labels: ["Cash", "Credit", "Mobile Banking"],
    datasets: [
      {
        label: "Sales - Cash",
        data: [totalSalesCash], // Add the total sales from cash
        fill: true,
        backgroundColor: "rgb(255, 0, 0)",
        borderColor: "rgb(255, 0, 0)",
      },
      {
        label: "Sales - Credit",
        data: [totalSalesCredit], // Add the total sales from credit
        fill: true,
        backgroundColor: "rgb(0, 255, 0)",
        borderColor: "rgb(0, 255, 0)",
      },
      {
        label: "Sales - Mobile Banking",
        data: [totalSalesMobileBanking], // Add the total sales from mobile banking
        fill: true,
        backgroundColor: "rgb(0, 0, 255)",
        borderColor: "rgb(0, 0, 255)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#475569",
        },
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
          maxTicksLimit: 1,
          color: "#475569",
        },
        grid: {
          color: "#e2e8f0",
        },
        pointLabels: {
          color: "#475569",
        },
        angleLines: {
          color: "#e2e8f0",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Radar options={options} data={data} height={350} />
    </div>
  );
};

export default RadarChart;
