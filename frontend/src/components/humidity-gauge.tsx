"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
  ChartData,
  ChartOptions,
} from "chart.js";
import { FC } from "react";

ChartJS.register(ArcElement, Tooltip, Title);

const HumidityGaugeComponent: FC = () => {
  // Hardcoded temperature value (you'll replace this with fetched data later)
  const temperature = 25;

  // Function to determine color based on temperature
  const getTemperatureColor = (temp: number): string => {
    if (temp <= 0) return "rgba(0, 0, 255, 1)"; // Cold (blue)
    if (temp <= 15) return "rgba(0, 255, 255, 1)"; // Cool (cyan)
    if (temp <= 25) return "rgba(0, 200, 100, 1)"; // Normal (green)
    if (temp <= 35) return "rgba(255, 165, 0, 1)"; // Warm (orange)
    return "rgba(255, 0, 0, 1)"; // Hot (red)
  };

  // Calculate percentage for the gauge (assuming range -10 to 50°C)
  const percentage = ((temperature + 10) / 60) * 100;

  const data: ChartData<"doughnut", number[], string> = {
    datasets: [
      {
        label: "Temperature",
        data: [percentage, 100 - percentage],
        backgroundColor: [
          getTemperatureColor(temperature),
          "rgba(200, 200, 200, 0.3)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    rotation: -90,
    circumference: 180,
    plugins: {
      tooltip: {
        enabled: false,
      },
      title: {
        display: true,
        text: "Temperature",
        font: {
          size: 25,
        },
        color: "black",
        padding: {
          top: 20,
          bottom: 10,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="w-full h-full bg-white rounded-lg flex flex-col items-center">
      <div className="px-4 w-full">
        <Doughnut data={data} options={options} />
      </div>
      <div className="text-3xl font-bold ">{temperature}°C</div>
    </div>
  );
};

export default HumidityGaugeComponent;
