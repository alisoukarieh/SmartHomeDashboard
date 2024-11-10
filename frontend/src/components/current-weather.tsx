"use client";

import { Cloud, Sun, Droplet, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CurrentWeather() {
  // Placeholder weather data
  const weatherData = {
    location: "New York, NY",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
  };

  return (
    <Card className="w-full  h-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {weatherData.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sun className="w-16 h-16 mr-4" />
            <Cloud className="w-16 h-16 -ml-8" />
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold">
              {weatherData.temperature}°F
            </div>
            <div className="text-xl">{weatherData.condition}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Droplet className="w-6 h-6 mr-2" />
            <span>Humidity: {weatherData.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="w-6 h-6 mr-2" />
            <span>Wind: {weatherData.windSpeed} mph</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
