"use client";

import * as React from "react";
import { Pie, PieChart, Sector, Label } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryStats = {
  categorie: string;
  total: number;
};

const COLORS = [
  "#26A69A", // Turquoise
  "#EF5350", // Rouge
  "#FFA726", // Orange
  "#FFCA28", // Jaune
  "#0288D1", // Bleu foncé
  "#AB47BC", // Violet
  "#66BB6A", // Vert
];

export function Component() {
  const id = "pie-interactive";
  const [data, setData] = React.useState<CategoryStats[]>([]);
  const [activeCat, setActiveCat] = React.useState<string>("");

  // Charge les données depuis l'API
  React.useEffect(() => {
    fetch("http://localhost:8080/api/produits/statistiques/toutes")
      .then((res) => res.json())
      .then((json: CategoryStats[]) => {
        // Ajouter une couleur à chaque entrée
        const withColor = json.map((item, i) => ({
          ...item,
          fill: COLORS[i % COLORS.length],
        }));
        setData(withColor);
        setActiveCat(withColor[0]?.categorie ?? "");
      })
      .catch((err) => console.error("Erreur lors du fetch des stats:", err));
  }, []);

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.categorie === activeCat),
    [activeCat, data]
  );

  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    data.forEach((item) => {
      config[item.categorie] = {
        label: item.categorie,
        color: item.fill,
      };
    });
    return config;
  }, [data]);

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-1">
      <Card data-chart={id} className="flex flex-col border-none bg-black">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle className="text-lg font-bold text-white">
              Statistiques par Catégorie
            </CardTitle>
            <CardDescription className="text-sm text-gray-300">
              Données dynamiques depuis l'API
            </CardDescription>
          </div>
          <Select value={activeCat} onValueChange={setActiveCat}>
            <SelectTrigger className="ml-auto h-7 w-[160px] rounded-lg pl-2.5 bg-gray-700 text-white">
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl bg-gray-700 text-white">
              {data.map((item) => (
                <SelectItem key={item.categorie} value={item.categorie}>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: item.fill }}
                    />
                    {item.categorie}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0 relative">
          <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px] relative">
            {/* Fond du donut */}
            <svg width="100%" height="100%" viewBox="0 0 200 200" className="absolute top-0 left-0">
              <circle cx="100" cy="100" r="80" fill="#1F2937" />
            </svg>
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="total"
                nameKey="categorie"
                innerRadius={60}
                outerRadius={100}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({ outerRadius = 0, ...props }) => (
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
                            {data[activeIndex]?.total?.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-gray-300 text-sm"
                          >
                            Ventes
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
