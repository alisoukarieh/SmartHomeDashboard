"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import UtilitiesPieChart from "@/components/utilities-pie-chart";
import BillsList from "@/components/bills-list";
import { UtilityBillManagerComponent } from "@/components/utility-bill-manager";
import { get } from "http";

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
      <div className="bg-white dark:bg-neutral-900 shadow-lg backdrop-blur-md bg-opacity-70 dark:bg-opacity-70 rounded-lg w-full ">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-4/6">
            <BillsList bills={bills} />
          </div>
          <div className="w-full md:w-2/6">
            <UtilityBillManagerComponent fetchBills={fetchBills} />
            <UtilitiesPieChart
              water={lastMonthTotalAmounts.Water || 0}
              electricity={lastMonthTotalAmounts.Electricity || 0}
              wifi={lastMonthTotalAmounts.Wifi || 0}
              gas={lastMonthTotalAmounts.Gas || 0}
              wasteManagement={lastMonthTotalAmounts["Waste Management"] || 0}
            />
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
