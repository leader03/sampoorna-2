import React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ topSellingBooks }) => {
  const data = {
    labels: topSellingBooks.map((book) => book.product__name.slice(0, 15)),
    datasets: [
      {
        label: "Sales Amount (Rs.)",
        data: topSellingBooks.map((book) => book.total_amount_sold),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            const quantity = topSellingBooks[context.dataIndex].total_quantity_sold;
            return `${datasetLabel}: Rs. ${value} | Quantity: ${quantity}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line options={options} data={data} height={350} />
    </div>
  );
};

export default LineChart;
