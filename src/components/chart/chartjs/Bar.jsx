import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ totalSalesCash, totalSalesCredit, totalSalesMobileBanking }) => {
  const data = {
    labels: ["Cash", "Credit", "Mobile Banking"],
    datasets: [
      {
        label: "Sales",
        data: [totalSalesCash, totalSalesCredit, totalSalesMobileBanking],
        backgroundColor: ["#5eead4", "#f0abfc", "#86efac"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: "",
        },
        ticks: {
          color: "#475569",
        },
      },
      x: {
        grid: {
          color: "#e2e8f0",
        },
        ticks: {
          color: "#475569",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#475569",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} height={350} />
    </div>
  );
};

export default BarChart;

