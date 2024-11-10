"use client";

import { LightbulbIcon, LockIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

interface StatusWidgetProps {
  icon: "light" | "lock";
  label: string;
  initialState?: boolean;
  onClick?: () => void;
}

function StatusWidget({
  icon,
  label,
  initialState = false,
  onClick,
}: StatusWidgetProps) {
  const [isActive, setIsActive] = useState(initialState);
  const IconComponent = icon === "light" ? LightbulbIcon : LockIcon;

  const handleClick = () => {
    setIsActive(!isActive);
    onClick?.();
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
          <StatusWidget icon="light" label="Living Room" initialState={true} />
          <StatusWidget icon="light" label="Kitchen" initialState={false} />
          <StatusWidget icon="light" label="Bedroom" initialState={true} />
          <StatusWidget icon="lock" label="Front Door" initialState={false} />
        </div>
      </CardContent>
    </Card>
  );
}
