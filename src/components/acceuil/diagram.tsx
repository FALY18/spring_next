"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#EF5350", // Orange
  },
} satisfies ChartConfig;

export function Componentdgr() {
  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl p-0">
      <Card className="border-none bg-black text-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white">
            Bar Chart - Label
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            January - June 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{ top: 20 }}
              width={400}
              height={300}
            >
              <CartesianGrid vertical={false} stroke="#4B5563" fill="#1F2937" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="#D1D5DB"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                }}
                itemStyle={{ color: "#FFFFFF" }}
              />
              <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-white"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none text-white">
            Trending up by 5.2% this month{" "}
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div className="leading-none text-gray-400">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
