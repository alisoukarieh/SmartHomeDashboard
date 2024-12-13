"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

import UtilitiesPieChart from "@/components/utilities-pie-chart";
import BillsList from "@/components/bills-list";
import { UtilityBillManagerComponent } from "@/components/utility-bill-manager";

interface Page1Props {
  isEditing: boolean;
  isLargeScreen: boolean;
}

interface Bill {
  date: string;
  amount: number;
  consumedValue: number;
  type: string;
}

export function Page2({ isEditing, isLargeScreen }: Page1Props) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [lastMonthTotalAmounts, setLastMonthTotalAmounts] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      await fetchBills();
      await fetchLastMonthUtilities();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLastMonthUtilities();
    };

    fetchData();
  }, [bills]);

  useEffect(() => {
    if (isLargeScreen) {
      const grid2 = GridStack.init(
        {
          column: 12,
          float: true,
          animate: true,
          minRow: 5,
          maxRow: 5,
          staticGrid: !isEditing,
        },
        ".grid-stack-page2"
      );
    }
  }, [isEditing]);

  const fetchBills = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bills`
      );
      setBills(response.data);
    } catch (error) {}
  };

  const fetchLastMonthUtilities = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/last_month_utilities`
      );
      setLastMonthTotalAmounts(response.data);
    } catch (error) {}
  };

  return (
    <div className="px-4 md:px-12">
      {isLargeScreen ? (
        // GridStack layout for larger screens
        <div className="grid-stack grid-stack-page2 bg-white shadow-lg backdrop-blur-md bg-opacity-70 rounded-lg">
          <div className="grid-stack-item" gs-w="8" gs-h="6" gs-x="5" gs-y="0">
            <div className="grid-stack-item-content">
              <BillsList bills={bills} />
            </div>
          </div>
          <div className="grid-stack-item" gs-w="4" gs-h="6" gs-x="0" gs-y="0">
            <div className="grid-stack-item-content  flex flex-col">
              <div className="h-1/2 mb-2">
                <UtilityBillManagerComponent fetchBills={fetchBills} />
              </div>
              <div className=" mb-2">
                <UtilitiesPieChart
                  water={lastMonthTotalAmounts.Water || 0}
                  electricity={lastMonthTotalAmounts.Electricity || 0}
                  wifi={lastMonthTotalAmounts.Wifi || 0}
                  gas={lastMonthTotalAmounts.Gas || 0}
                  wasteManagement={
                    lastMonthTotalAmounts["Waste Management"] || 0
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Simple stacked layout for smaller screens
        <div className="space-y-4">
          <div>
            <UtilityBillManagerComponent fetchBills={fetchBills} />
          </div>
          <div>
            <UtilitiesPieChart
              water={lastMonthTotalAmounts.Water || 0}
              electricity={lastMonthTotalAmounts.Electricity || 0}
              wifi={lastMonthTotalAmounts.Wifi || 0}
              gas={lastMonthTotalAmounts.Gas || 0}
              wasteManagement={lastMonthTotalAmounts["Waste Management"] || 0}
            />
          </div>
          <div className="">
            <BillsList bills={bills} />
          </div>
        </div>
      )}
    </div>
  );
}
