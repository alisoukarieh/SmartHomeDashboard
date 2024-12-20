"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { StockPrices } from "@/components/stock-prices";
import TodoList from "@/components/todo-list";
import { CurrentWeather } from "@/components/current-weather";
import HumidityGaugeComponent from "@/components/hum-gauge";
import TemperatureGaugeComponent from "@/components/temp-gauge";
import { ConnectedDevicesLogComponent } from "./connected-devices-log";
import UtilitiesPieChart from "@/components/utilities-pie-chart";
import PhotoFrame from "@/components/photo_frame";
import { StatusWidgetsComponent } from "./status-widgets";

interface Page1Props {
  isEditing: boolean;
  isLargeScreen: boolean;
}

export function Page1({ isEditing, isLargeScreen }: Page1Props) {
  useEffect(() => {
    if (isLargeScreen) {
      const grid1 = GridStack.init(
        {
          column: 12,
          float: true,
          animate: true,
          minRow: 5,
          maxRow: 5,
          staticGrid: !isEditing,
        },
        ".grid-stack-page1"
      );
    }
  }, [isEditing]);

  return (
    <div className="px-4 md:px-12">
      {isLargeScreen ? (
        // GridStack layout for larger screens
        <div className="grid-stack grid-stack-page1 bg-white dark:bg-neutral-900 shadow-lg backdrop-blur-md bg-opacity-70 dark:bg-opacity-70 rounded-lg">
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="3"
            gs-x="4"
            gs-y="0"
            gs-no-resize="true"
          >
            <div className="grid-stack-item-content">
              <PhotoFrame />
            </div>
          </div>
          <div
            className="grid-stack-item border-dark"
            gs-w="4"
            gs-h="3"
            gs-x="0"
            gs-y="0"
          >
            <div className="grid-stack-item-content"></div>
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
            <div className="grid-stack-item-content h-full">
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
            <div className="grid-stack-item-content h-full">
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
            gs-h="6"
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
          <div>
            <CurrentWeather />
          </div>
          <div className="border-dark flex flex-row mx-2 space-x-2">
            <div className="w-1/2">
              <TemperatureGaugeComponent />
            </div>
            <div className="w-1/2">
              <HumidityGaugeComponent />
            </div>
          </div>
          <div>
            <ConnectedDevicesLogComponent />
          </div>
          <div>
            <StatusWidgetsComponent />
          </div>
        </div>
      )}
    </div>
  );
}
