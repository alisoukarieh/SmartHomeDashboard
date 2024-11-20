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

const utilityTypes = [
  "Electricity",
  "Water",
  "Gas",
  "Internet",
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

export function UtilityBillManagerComponent() {
  const [bills, setBills] = useState<UtilityBill[]>([]);
  const [newBill, setNewBill] = useState<Partial<UtilityBill>>({});

  useEffect(() => {
    fetchBills();
  }, []);

  const addBill = async () => {
    if (newBill.type && newBill.month && newBill.amount) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/add_bill`, {
          apartment_id: 1,
          bill_type: newBill.type,
          amount: newBill.amount,
          date: newBill.month,
        });
        setBills((prevBills) => [
          ...prevBills,
          { ...newBill, id: Date.now().toString() } as UtilityBill,
        ]);
        setNewBill({});
      } catch (error) {
        console.error("Error adding bill:", error);
      }
    }
  };

  const fetchBills = async () => {
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
    <Card className="w-full max-w-xl h-[40rem] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
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
        <div
          className="overflow-y-auto h-72 w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.type}</TableCell>
                  <TableCell>{bill.month}</TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteBill(bill.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
