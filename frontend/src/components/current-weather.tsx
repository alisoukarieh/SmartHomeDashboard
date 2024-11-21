"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  Sun,
  Droplet,
  Wind,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherData {
  location: string;
  temperature: number;
  condition: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherIconProps {
  weatherCode: number;
}

function getWeatherIcon(weatherCode: number): JSX.Element {
  switch (weatherCode) {
    case 0:
      return <Sun className="w-24 h-24 mr-4" />;
    case 1:
    case 2:
    case 3:
      return <Cloud className="w-24 h-24 mr-4" />;
    case 45:
    case 48:
      return <CloudRain className="w-24 h-24 mr-4" />;
    case 51:
    case 53:
    case 55:
      return <Droplet className="w-24 h-24 mr-4" />;
    case 61:
    case 63:
    case 65:
      return <CloudRain className="w-24 h-24 mr-4" />;
    case 71:
    case 73:
    case 75:
      return <CloudSnow className="w-24 h-24 mr-4" />;
    case 95:
    case 96:
    case 99:
      return <CloudLightning className="w-24 h-24 mr-4" />;
    default:
      return <Sun className="w-24 h-24 mr-4" />;
  }
}

export function CurrentWeather() {
  const [weatherData, setWeatherData] = useState({
    location: "Loading...",
    temperature: 0,
    condition: 0,
    humidity: 0,
    windSpeed: 0,
  });

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=48.8575&longitude=2.3514&current_weather=true"
      );
      const data = await response.json();
      console.log(data);
      const currentWeather = data.current_weather;
      setWeatherData({
        location: "Paris, France",
        temperature: currentWeather.temperature,
        condition: currentWeather.weathercode,
        humidity: currentWeather.relative_humidity,
        windSpeed: currentWeather.windspeed,
      });
    }
    fetchWeather();
  }, []);

  return (
    <Card className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {weatherData.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold">
              {weatherData.temperature}°C
            </div>
          </div>
        </div>
        <div className="mt-6 ">
          <div className="flex items-center justify-end">
            <Wind className="w-6 h-6 mr-2" />
            <span>Wind: {weatherData.windSpeed} mph</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
