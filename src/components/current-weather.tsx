import type {WeatherData, GeocodingResponse } from "@/api/types";
import {Card,CardContent} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherData ;
    locationName?: GeocodingResponse ;
}


const CurrentWeather = ({ data,locationName }: CurrentWeatherProps) => {
    const { 
        main:{temp, feels_like, temp_min, temp_max, humidity}, 
        weather: [currentWeather], 
        wind: { speed },
    } = data ;

const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°C`;
};
  return (
    <div>
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end gap-1">
                                <h2 className="text-2xl font-bold tracking-tighter">
                                    {locationName?.name}
                                </h2>
                                {locationName?.state && (
                                    <span className="text-muted-foreground">
                                        , {locationName.state}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {locationName?.country}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                                <p className="text-7xl font-bold tracking-tighter">
                                    {formatTemp(temp)}
                                </p>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Feels like {formatTemp(feels_like)}
                                    </p>
                                    <div className="flex gap-2 text-sm font-medium ">
                                        <span className="flex items-center gap-1 text-blue-500">
                                            <ArrowDown className="h-3 w-3" />
                                            {formatTemp(temp_min)}
                                        </span>
                                        <span className="flex items-center gap-1 text-red-500">
                                            <ArrowUp className="h-3 w-3" />
                                            {formatTemp(temp_max)}
                                        </span>
                                    </div>
                                </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium ">Humidity</p>
                                    <p className="text-sm font-medium text-muted-foreground">{humidity}%</p>

                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium ">Wind Speed</p>
                                    <p className="text-sm font-medium text-muted-foreground">{speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                            <img 
                                src={`http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`} 
                                alt={currentWeather.description} 
                                className="h-full w-full object-contain"
                            />
                            <div className="absolute bottom-0 text-center">
                                <p className="text-sm font-medium capitalize ">
                                    {currentWeather.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default CurrentWeather

// CurrentWeather(data, locationName)
//          ↓
// Extract temp, wind, weather icon, humidity, etc.
//          ↓
// Render a Card with 2 columns:
//   ├─ Left: 
//   │   ├─ City, State, Country
//   │   ├─ Temperature (actual + feels-like)
//   │   ├─ Min/Max temp
//   │   ├─ Humidity & Wind
//   └─ Right:
//       ├─ Weather icon (from OpenWeather)
//       └─ Weather description ("cloudy", etc.)


// | Layer          | Goal                      | Classes Used                                         |
// | -------------- | ------------------------- | ---------------------------------------------------- |
// | Card           | Outer shell               | `overflow-hidden`                                    |
// | Content        | Padding inside            | `p-6`                                                |
// | Layout         | Two columns               | `grid md:grid-cols-2`                                |
// | Vertical Stack | Space between sections    | `space-y-4`, `space-y-2`                             |
// | Flex Rows      | Align items in a row      | `flex items-center gap-x`                            |
// | Typography     | Emphasis                  | `text-xl`, `text-muted-foreground`, `tracking-tight` |
// | Icons & Info   | Icon + label + value UI   | `flex gap-2`, `text-sm`                              |
// | Responsive     | Looks good on all screens | `md:grid-cols-2`, `w-full max-w-[200px]`             |
