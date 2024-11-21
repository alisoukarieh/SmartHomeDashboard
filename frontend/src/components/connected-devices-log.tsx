"'use client'";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Thermometer, Fan, Eye, Activity, Zap } from "lucide-react";
import axios from "axios";

type DeviceType =
  | "'temperature'"
  | "'motor'"
  | "'motion'"
  | "'energy'"
  | "'other'";

interface DeviceLog {
  id: string;
  log: string;
}

const getDeviceIcon = (type: DeviceType) => {
  switch (type) {
    case "'temperature'":
      return <Thermometer className="h-4 w-4" />;
    case "'motor'":
      return <Fan className="h-4 w-4" />;
    case "'motion'":
      return <Eye className="h-4 w-4" />;
    case "'energy'":
      return <Zap className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getDeviceColor = (type: DeviceType) => {
  switch (type) {
    case "'temperature'":
      return "'bg-red-500'";
    case "'motor'":
      return "'bg-blue-500'";
    case "'motion'":
      return "'bg-green-500'";
    case "'energy'":
      return "'bg-yellow-500'";
    default:
      return "'bg-purple-500'";
  }
};

export function ConnectedDevicesLogComponent() {
  const [deviceLogs, setDeviceLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeviceLogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/recorded_data`
      );
      setDeviceLogs(response.data);
    } catch (error) {
      console.error("Error fetching device logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceLogs();
    const interval = setInterval(fetchDeviceLogs, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Connected Devices Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <ScrollArea className="h-64 w-full pr-4">
            {deviceLogs.map((log, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <p className="text-md ">• {log}</p>
                  </div>
                </div>
                <hr className="border-t border-gray-300 w-full" />
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
