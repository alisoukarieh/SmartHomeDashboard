// components/BarChart.tsx

"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { FC } from "react";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: FC = () => {
  // Define the data for each month
  const data: ChartData<"bar", number[], string> = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: [300, 500, 400, 600, 700, 550, 800, 750, 650, 900, 850, 950],
        backgroundColor: "rgba(29, 64, 175, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define options for the bar chart
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Utility Expenses over the Year",
        font: {
          size: 30,
        },
        color: "rgba(29, 64, 175, 1)",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        grid: {
          display: false, // Disable gridlines on the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
        grid: {
          display: false, // Disable gridlines on the y-axis
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-gradient-to-br from-blue-50 to-blue-100 h-full rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
