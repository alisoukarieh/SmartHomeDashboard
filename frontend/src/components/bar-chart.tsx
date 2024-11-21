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
import { FC, useEffect, useState } from "react";
import axios from "axios";

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
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/monthly_utilities`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchMonthlyData();
  }, []);

  const chartData: ChartData<"bar", number[], string> = {
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
        data: data,
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
