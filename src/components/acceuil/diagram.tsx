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
import { useEffect, useState } from "react";

const chartConfig = {
  stock: {
    label: "Stock",
    color: "#EF5350",
  },
} satisfies ChartConfig;

interface StockData {
  jour: string;
  stock: number;
}

export function Componentdgr() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/produits/statistiques/stock-par-jour"
        );
        if (!response.ok) throw new Error("Erreur de récupération des données");
        const data = await response.json();
        setStockData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Erreur: {error}</div>;
  }

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl p-0">
      <Card className="border-none bg-black text-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white">
            Évolution du stock
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Dernières variations de stock
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              data={stockData}
              margin={{ top: 20 }}
              width={400}
              height={300}
            >
              <CartesianGrid vertical={false} stroke="#4B5563" fill="#1F2937" />
              <XAxis
                dataKey="jour"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
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
              <Bar dataKey="stock" fill={chartConfig.stock.color} radius={8}>
                <LabelList
                  dataKey="stock"
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
            Dernière mise à jour{" "}
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div className="leading-none text-gray-400">
            {stockData.length > 0 && 
              `Dernier enregistrement: ${new Date(stockData[stockData.length - 1].jour).toLocaleDateString()}`
            }
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}