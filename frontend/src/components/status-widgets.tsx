"use client";

import { LightbulbIcon, LockIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";

interface StatusWidgetProps {
  icon: "light" | "lock";
  label: string;
  initialState?: boolean;
  onClick?: () => void;
  id: string; // Add a unique identifier for each widget
}

function StatusWidget({
  icon,
  label,
  initialState = false,
  onClick,
  id, // Destructure the id prop
}: StatusWidgetProps) {
  const [isActive, setIsActive] = useState(initialState);
  const IconComponent = icon === "light" ? LightbulbIcon : LockIcon;

  const handleClick = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (id === "living-room") {
        if (icon === "light") {
          if (isActive) {
            await axios.get(`${apiUrl}/turn_off_light`);
          } else {
            await axios.get(`${apiUrl}/turn_on_light`);
          }
        }
      }
      setIsActive(!isActive);
      onClick?.();
    } catch (error) {
      console.error(`Error toggling ${icon}:`, error);
    }
  };

  const getColor = () => {
    if (isActive) {
      return icon === "light"
        ? "bg-yellow-400 text-yellow-950"
        : "bg-green-500 text-green-950";
    }
    return "bg-slate-200 text-slate-700";
  };

  return (
    <Card
      className={`${getColor()} w-full h-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-200`}
      onClick={handleClick}
    >
      <CardContent className="p-4 text-center">
        <IconComponent className="w-8 h-8 mb-2 mx-auto" />
        <div className="text-xs font-medium">{label}</div>
        <div className="text-lg font-bold">
          {icon === "light"
            ? isActive
              ? "On"
              : "Off"
            : isActive
            ? "Unlocked"
            : "Locked"}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatusWidgetsComponent() {
  return (
    <Card className="w-full h-full bg-white dark:bg-neutral-950">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Favorite Devices</h2>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-x-4">
          <StatusWidget
            id="living-room"
            icon="light"
            label="Living Room"
            initialState={true}
          />
          <StatusWidget
            id="kitchen"
            icon="light"
            label="Kitchen"
            initialState={false}
          />
          <StatusWidget
            id="bedroom"
            icon="light"
            label="Bedroom"
            initialState={true}
          />
          <StatusWidget
            id="front-door"
            icon="lock"
            label="Front Door"
            initialState={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}
