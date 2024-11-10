"'use client'";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Thermometer, Fan, Eye, Activity, Zap } from "lucide-react";

type DeviceType =
  | "'temperature'"
  | "'motor'"
  | "'motion'"
  | "'energy'"
  | "'other'";

interface DeviceLog {
  id: string;
  name: string;
  type: DeviceType;
  value: string;
  timestamp: string;
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
  const [deviceLogs, setDeviceLogs] = useState<DeviceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceLogs = async () => {
      try {
        // Simulating API call with mock data
        const response = await new Promise<DeviceLog[]>((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  id: "'1'",
                  name: "'Living Room Sensor'",
                  type: "'temperature'",
                  value: "'22°C'",
                  timestamp: "'2023-05-15 10:30:00'",
                },
                {
                  id: "'2'",
                  name: "'Garage Door'",
                  type: "'motor'",
                  value: "'Closed'",
                  timestamp: "'2023-05-15 10:29:30'",
                },
                {
                  id: "'3'",
                  name: "'Backyard Camera'",
                  type: "'motion'",
                  value: "'No motion'",
                  timestamp: "'2023-05-15 10:28:45'",
                },
                {
                  id: "'4'",
                  name: "'Solar Panel'",
                  type: "'energy'",
                  value: "'5.2 kWh'",
                  timestamp: "'2023-05-15 10:28:00'",
                },
                {
                  id: "'5'",
                  name: "'Kitchen Sensor'",
                  type: "'temperature'",
                  value: "'24°C'",
                  timestamp: "'2023-05-15 10:27:30'",
                },
              ]),
            1000
          )
        );
        setDeviceLogs(response);
      } catch (error) {
        console.error("'Error fetching device logs:'", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceLogs();
  }, []);

  return (
    <Card className="w-full h-full  bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
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
            {deviceLogs.map((log) => (
              <div key={log.id} className="mb-4 last:mb-0">
                <div className="flex items-center space-x-2">
                  <div
                    className={`p-2 rounded-full ${getDeviceColor(log.type)}`}
                  >
                    {getDeviceIcon(log.type)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{log.name}</h3>
                    <p className="text-sm opacity-80">{log.value}</p>
                  </div>
                  <div className="text-xs opacity-60">{log.timestamp}</div>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
