import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Wind, Droplets } from "lucide-react";

interface DailyForecast{
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

interface WeatherForecastProps {
    data:ForecastData;
}

const WeatherForecast = ({data}:WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc,forecast)=>{
    const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');
    if(!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date:forecast.dt,
      };
    }else{
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);
  console.log("Daily Forecasts", dailyForecasts);
  const nextDays = Object.values(dailyForecasts).slice(0,6);
  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };
  return (
    <Card>
        <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {nextDays.map((day) => {
              return (
                <div key={day.date} 
                  className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{format(new Date(day.date * 1000), 'EEE, MMM d')}</p>
                    <p className="text-sm text-muted-foreground">{day.weather.description}</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <span className="flex items-center text-blue-500">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      {formatTemp(day.temp_min)}
                    </span>
                    <span className="flex items-center text-red-500">
                      <ArrowUp className="h-4 w-4  mr-1" />
                      {formatTemp(day.temp_max)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{day.humidity}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{day.wind} m/s</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
    </Card>
  )
}

export default WeatherForecast


            // ┌───────────────────────────────┐
            // │      WeatherForecast Props    │
            // │        { data: ForecastData } │
            // └──────────────┬────────────────┘
            //                │
            //                ▼
            // ┌───────────────────────────────┐
            // │  Extract Daily Forecasts      │
            // │  - Use reduce() to group by   │
            // │    date (yyyy-MM-dd)          │
            // │  - Track temp_min, temp_max,  │
            // │    humidity, wind, weather    │
            // └──────────────┬────────────────┘
            //                │
            //                ▼
            // ┌───────────────────────────────┐
            // │ Convert to Array:             │
            // │ nextDays = Object.values(...) │
            // │ and slice first 6 days        │
            // └──────────────┬────────────────┘
            //                │
            //                ▼
            // ┌───────────────────────────────┐
            // │    Render Card Container      │
            // │  ┌─────────────────────────┐  │
            // │  │ CardHeader (Title)      │  │
            // │  └─────────────────────────┘  │
            // │  ┌─────────────────────────┐  │
            // │  │ CardContent             │  │
            // │  │  ┌────────────────────┐ │  │
            // │  │  │  Grid of 6 days    │ │  │
            // │  │  └────────────────────┘ │  │
            // └──────────────┬────────────────┘
            //                │
            //                ▼
            // ┌───────────────────────────────┐
            // │   For Each Day (map)          │
            // │  ┌─────────────────────────┐  │
            // │  │ Grid with 3 columns     │  │
            // │  │ 1. Date + description   │  │
            // │  │ 2. Min & Max Temp       │  │
            // │  │ 3. Humidity + Wind      │  │
            // │  └─────────────────────────┘  │
            // └───────────────────────────────┘
