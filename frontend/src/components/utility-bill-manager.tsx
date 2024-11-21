"'use client'";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface UtilityBill {
  id: string;
  type: string;
  month: string;
  amount: number;
}

interface UtilityBillManagerComponentProps {
  fetchBills: () => void;
}

const utilityTypes = [
  "Electricity",
  "Water",
  "Gas",
  "Wifi",
  "Waste Management",
];
const months = [
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
];

export function UtilityBillManagerComponent({
  fetchBills,
}: UtilityBillManagerComponentProps) {
  const [bills, setBills] = useState<UtilityBill[]>([]);
  const [newBill, setNewBill] = useState<Partial<UtilityBill>>({});

  useEffect(() => {
    fetchBills();
  }, []);

  const addBill = async () => {
    if (newBill.type && newBill.month && newBill.amount) {
      try {
        const currentYear = new Date().getFullYear();
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add_bill`, {
          apartment_id: 1,
          bill_type: newBill.type,
          amount: newBill.amount,
          date: `${newBill.month} ${currentYear}`,
        });
        fetchBills(); // Fetch updated bills from the backend
        setNewBill({});
      } catch (error) {
        console.error("Error adding bill:", error);
      }
    }
  };

  const fetchAllBills = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bills`
      );
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const deleteBill = (id: string) => {
    setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
  };

  return (
    <Card className="w-full max-w-xl h-[20rem] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-100">
          Utility Bill Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-6">
          <Select
            value={newBill.type}
            onValueChange={(value) => setNewBill({ ...newBill, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select utility type" />
            </SelectTrigger>
            <SelectContent>
              {utilityTypes.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={newBill.month}
            onValueChange={(value) => setNewBill({ ...newBill, month: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            value={newBill.amount || ""}
            onChange={(e) =>
              setNewBill({ ...newBill, amount: parseFloat(e.target.value) })
            }
          />
          <Button
            onClick={addBill}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Bill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
