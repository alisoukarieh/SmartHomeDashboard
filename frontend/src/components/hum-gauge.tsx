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
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Title);

const HumGaugeComponent: FC = () => {
  // Hardcoded temperature value (you'll replace this with fetched data later)
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/temp_hum`
        );
        setHumidity(response.data.humidity);
      } catch (error) {
        console.error("Error fetching temperature:", error);
      }
    };

    fetchTemperature();
    const interval = setInterval(fetchTemperature, 600000); // 10 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  // Function to determine color based on temperature
  const getTemperatureColor = (temp: number): string => {
    return "rgba(0, 150, 255, 1)"; // Cool (cyan)
  };

  // Calculate percentage for the gauge (assuming range -10 to 50°C)
  const percentage = humidity;

  const data: ChartData<"doughnut", number[], string> = {
    datasets: [
      {
        label: "Temperature",
        data: [percentage, 100 - percentage],
        backgroundColor: [
          getTemperatureColor(humidity),
          "rgba(200, 200, 200, 0.3)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // stackoverflow
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
        text: "Humidity",
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
    <div className="w-full  bg-white rounded-lg flex flex-col items-center">
      <div className="px-4 w-full ">
        <Doughnut data={data} options={options} />
      </div>
      <div className="text-3xl font-bold ">{humidity}%</div>
    </div>
  );
};

export default HumGaugeComponent;
