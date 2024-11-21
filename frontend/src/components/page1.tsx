"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { StockPrices } from "@/components/stock-prices";
import { TodoList } from "@/components/todo-list";
import { CurrentWeather } from "@/components/current-weather";
import TemperatureGaugeComponent from "@/components/temperature-gauge";
import HumidityGaugeComponent from "@/components/humidity-gauge";
import { ConnectedDevicesLogComponent } from "./connected-devices-log";
import UtilitiesPieChart from "@/components/utilities-pie-chart";
import { StatusWidgetsComponent } from "./status-widgets";

interface Page1Props {
  isEditing: boolean;
  isLargeScreen: boolean;
}

export function Page1({ isEditing, isLargeScreen }: Page1Props) {
  const [utilitiesData, setUtilitiesData] = useState({
    Water: 0,
    Electricity: 0,
    Wifi: 0,
  });

  const fetchUtilitiesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/last_month_utilities`
      );
      setUtilitiesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching utilities data:", error);
    }
  };

  useEffect(() => {
    fetchUtilitiesData();
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      const grid = GridStack.init({
        column: 12,
        float: true,
        animate: true,
        minRow: 5,
        maxRow: 5,
        staticGrid: !isEditing,
      });
    }
  }, [isEditing]);

  return (
    <div className="px-4 md:px-12">
      {isLargeScreen ? (
        // GridStack layout for larger screens
        <div className="grid-stack bg-white dark:bg-neutral-900 shadow-lg backdrop-blur-md bg-opacity-70 dark:bg-opacity-70 rounded-lg">
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="3"
            gs-x="4"
            gs-y="0"
            gs-no-resize="true"
          >
            <div className="grid-stack-item-content">
              <StockPrices />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="3"
            gs-x="0"
            gs-y="0"
          >
            <div className="grid-stack-item-content">
              <UtilitiesPieChart
                water={utilitiesData.Water}
                electricity={utilitiesData.Electricity}
                wifi={utilitiesData.Wifi}
              />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="2"
            gs-x="4"
            gs-y="3"
          >
            <div className="grid-stack-item-content">
              <CurrentWeather />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="2"
            gs-h="2"
            gs-x="8"
            gs-y="0"
            gs-no-resize="true"
          >
            <div className="grid-stack-item-content">
              <TemperatureGaugeComponent />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="2"
            gs-h="2"
            gs-x="10"
            gs-y="0"
            gs-no-resize="true"
          >
            <div className="grid-stack-item-content">
              <HumidityGaugeComponent />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="3"
            gs-x="8"
            gs-y="2"
          >
            <div className="grid-stack-item-content">
              <ConnectedDevicesLogComponent />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="2"
            gs-x="0"
            gs-y="3"
          >
            <div className="grid-stack-item-content">
              <StatusWidgetsComponent />
            </div>
          </div>
        </div>
      ) : (
        // Simple stacked layout for smaller screens
        <div className="space-y-4 ">
          <div className="border-dark">
            <StockPrices />
          </div>
          <div className="border-dark">
            <TodoList />
          </div>
          <div className="border-dark">
            <CurrentWeather />
          </div>
        </div>
      )}
    </div>
  );
}
