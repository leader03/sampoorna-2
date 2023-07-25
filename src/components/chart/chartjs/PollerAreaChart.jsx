import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { colors, hexToRGB } from "../../../constant/data";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PollerAreaChart = ({ data }) => {
  const chartData = {
    labels: data.map((book) => book.product__name),
    datasets: [
      {
        label: "Total Quantity Sold",
        data: data.map((book) => book.total_quantity_sold),
        backgroundColor: [
          colors.primary,
          colors.success,
          colors.warning,
          colors.info,
          colors.danger,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      r: {
        ticks: {
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
      <PolarArea options={options} data={chartData} height={350} />
    </div>
  );
};

export default PollerAreaChart;
