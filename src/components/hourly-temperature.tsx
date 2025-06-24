import type { ForecastData } from "@/api/types"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {ResponsiveContainer, LineChart,Line, XAxis, YAxis, Tooltip } from "recharts";
import {format} from "date-fns";
interface HourlyTemperatureProps {
    data: ForecastData;
    }


const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
    const charData = data.list.slice(0,8).map((item) => ({
        time:format(new Date(item.dt * 1000), 'ha'),
        temp:Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }));
    
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart  data={charData}>
                    <XAxis
                        dataKey="time"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}°C`}
                    />
                    {/* tooltip */}
                    <Line 
                        type="monotone"
                        dataKey="temp"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line 
                        type="monotone"
                        dataKey="feels_like"
                        stroke="#026946"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="4 5"
                    />

                    <Tooltip 
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Temperature</span>
                                                <span className="font-bold">{payload[0].value}°C</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Feels Like</span>
                                                <span className="font-bold">{payload[1].value}°C</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>
      </CardContent>
    </Card>
  )
}

export default HourlyTemperature

    //                     [ Parent Component ]
    //                            |
    //                            |  props: { data: ForecastData }
    //                            ▼
    //                  ┌────────────────────────────┐
    //                  │ HourlyTemperature Component│
    //                  └────────────────────────────┘
    //                            |
    //             ┌──────────────┴─────────────────┐
    //             |                                |
    //             ▼                                ▼
    //   [ Data Transformation ]           [ UI Rendering ]
    //    - Slice first 8 hours             - Card layout
    //    - Format time                    ┌──────────────┐
    //    - Round temperatures             │  <Card>      │
    //             |                      ┌┴──────────────┴┐
    //             ▼                      │  <CardHeader>  │
    //     charData[] = [                 │   <CardTitle>  │
    //       { time, temp, feels_like }   └───────────────┘
    //     ]                                       |
    //                                             ▼
    //                                     [ CardContent ]
    //                                             |
    //                                             ▼
    //                                  ┌────────────────────┐
    //                                  │ <ResponsiveContainer>
    //                                  │   <LineChart data={charData}>
    //                                  │      ├── <XAxis time>
    //                                  │      ├── <YAxis temp>
    //                                  │      ├── <Line temp>
    //                                  │      ├── <Line feels_like>
    //                                  │      └── <Tooltip> (Custom)
    //                                  └────────────────────┘
