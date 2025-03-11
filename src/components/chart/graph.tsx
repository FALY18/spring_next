import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer } from "../ui/chart";
import { type ChartConfig } from "@/components/ui/chart";

const chartData = [
	{ month: "Janvier", stocksAndOrders: 120, purchases: 80 },
	{ month: "Février", stocksAndOrders: 150, purchases: 90 },
	{ month: "Mars", stocksAndOrders: 180, purchases: 100 },
	// Ajoutez d'autres mois selon vos besoins
      ];


      const chartConfig: ChartConfig = {
	stocksAndOrders: {
	  label: "Stocks et Commandes",
	  color: "#2563eb", // Couleur personnalisée
	},
	purchases: {
	  label: "Achats",
	  color: "#60a5fa", // Couleur personnalisée
	},
      };
      
      
export function StatistiquesGraphique() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px]">
      <BarChart data={chartData}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stocksAndOrders" fill={chartConfig.stocksAndOrders.color} />
        <Bar dataKey="purchases" fill={chartConfig.purchases.color} />
      </BarChart>
    </ChartContainer>
  );
}
