"use client";
import { useEffect, useState } from "react";

import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { StockPrices } from "@/components/stock-prices";
import { TodoList } from "@/components/todo-list";
import { CurrentWeather } from "@/components/current-weather";
import TemperatureGaugeComponent from "@/components/temperature-gauge";
import HumidityGaugeComponent from "@/components/humidity-gauge";
import { ConnectedDevicesLogComponent } from "./connected-devices-log";
import { UtilityBillManagerComponent } from "@/components/utility-bill-manager";
import { StatusWidgetsComponent } from "./status-widgets";
import Barchart from "@/components/bar-chart";

interface Page1Props {
  isEditing: boolean;
  isLargeScreen: boolean;
}

export function Page2({ isEditing, isLargeScreen }: Page1Props) {
  useEffect(() => {
    if (isLargeScreen) {
      const grid2 = GridStack.init({
        column: 12,
        float: true,
        animate: true,
        minRow: 5,
        maxRow: 5,
        staticGrid: !isEditing,
      });
    }
  }, []);

  return (
    <div className="px-4 md:px-12">
      <div className="grid-stack bg-white dark:bg-neutral-900 shadow-lg backdrop-blur-md bg-opacity-70 dark:bg-opacity-70 rounded-lg ">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <Barchart />
          </div>
          <div className="w-full md:w-1/4">
            <UtilityBillManagerComponent />
          </div>
        </div>
      </div>
      {isLargeScreen ? (
        // GridStack layout for larger screens
        <div className=""></div>
      ) : (
        // Simple stacked layout for smaller screens
        <div className="space-y-4 ">Do later</div>
      )}
    </div>
  );
}
