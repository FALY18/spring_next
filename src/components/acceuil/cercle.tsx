"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Données mises à jour pour correspondre au total de 1 125 visiteurs
const desktopData = [
  { month: "january", desktop: 225, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 185, fill: "var(--color-may)" },
];

// Configuration mise à jour pour correspondre aux couleurs de l'image
const chartConfig = {
  visitors: {
    label: "Visiteurs",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "Janvier",
    color: "#26A69A", // Turquoise
  },
  february: {
    label: "Février",
    color: "#EF5350", // Rouge
  },
  march: {
    label: "Mars",
    color: "#FFA726", // Orange
  },
  april: {
    label: "Avril",
    color: "#FFCA28", // Jaune
  },
  may: {
    label: "Mai",
    color: "#0288D1", // Bleu foncé
  },
} satisfies ChartConfig;

export function Component() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );
  const months = React.useMemo(() => desktopData.map((item) => item.month), []);

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-1">
      <Card data-chart={id} className="flex flex-col border-none bg-black">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle className="text-lg font-bold text-white">
              Graphique en donut - Interactif
            </CardTitle>
            <CardDescription className="text-sm text-gray-300">
              Janvier - Juin 2024
            </CardDescription>
          </div>
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 bg-gray-700 text-white"
              aria-label="Sélectionner un mois"
            >
              <SelectValue placeholder="Sélectionner un mois" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl bg-gray-700 text-white">
              {months.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig];
                if (!config) return null;
                return (
                  <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{ backgroundColor: `var(--color-${key})` }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0 relative">
          <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px] relative">
            {/* Fond intérieur du donut en couleur sombre */}
            <svg width="100%" height="100%" viewBox="0 0 200 200" className="absolute top-0 left-0">
              <circle cx="100" cy="100" r="80" fill="#1F2937" />
            </svg>
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={desktopData}
                dataKey="desktop"
                nameKey="month"
                innerRadius={60}
                outerRadius={100}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-white text-3xl font-bold"
                          >
                            {desktopData[activeIndex].desktop.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-gray-300 text-sm"
                          >
                            Visiteurs
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
