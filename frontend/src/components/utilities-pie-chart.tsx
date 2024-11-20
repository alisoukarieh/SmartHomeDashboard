// components/PieChart.tsx

"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Title,
} from "chart.js";
import { FC } from "react";

interface UtilitiesPieChartProps {
  water: number;
  electricity: number;
  wifi: number;
}

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const UtilitiesPieChart: FC<UtilitiesPieChartProps> = ({
  water,
  electricity,
  wifi,
}) => {
  // Define the data for the pie chart with proper TypeScript typing
  const data: ChartData<"pie", number[], string> = {
    labels: ["Electricity", "Wifi", "Water"],
    datasets: [
      {
        label: "Colors",
        data: [electricity, wifi, water],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options with TypeScript typing
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: "Utilities",
        font: {
          size: 28,
        },
        color: "black",
      },
    },
  };

  return (
    <div className="rounded-lg bg-white h-full">
      <div className="h-full max-w-sm mx-auto p-4">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UtilitiesPieChart;
