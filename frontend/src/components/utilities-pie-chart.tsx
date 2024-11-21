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
  gas: number;
  wasteManagement: number;
}

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const UtilitiesPieChart: FC<UtilitiesPieChartProps> = ({
  water,
  electricity,
  wifi,
  gas,
  wasteManagement,
}) => {
  // Define the data for the pie chart with proper TypeScript typing
  const data: ChartData<"pie", number[], string> = {
    labels: ["Electricity", "Wifi", "Water", "Gas", "Waste Management"],
    datasets: [
      {
        label: "Colors",
        data: [electricity, wifi, water, gas, wasteManagement],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
    },
  };

  return (
    <div className="rounded-lg bg-gradient-to-br from-red-50 to-red-100 h-[19rem] mt-3 p-4">
      <h2 className="text-2xl font-bold text-red-800">Bills History</h2>
      <div className="h-full w-full px-24">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UtilitiesPieChart;
