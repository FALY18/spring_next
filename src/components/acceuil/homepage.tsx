	"use client";
	import { StatistiquesGraphique } from "../chart/graph";
	import FormulaireAchat from "./formAchat";

	const Home = () => {
	return (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
	{/* Colonne de gauche - Graphiques et Statistiques */}
	<div className="space-y-4 p-4">
		<h2 className="text-2xl font-semibold">Statistiques</h2>
		<div className="bg-white shadow-lg p-4 rounded-lg">
		<div className="h-72 bg-gray-100 rounded-lg flex items-center justify-center">
		<StatistiquesGraphique />
		</div>
		</div>
	</div>

	{/* Colonne de droite - Formulaire d'achat */}
	<div className="space-y-4 p-[40px]">
		<FormulaireAchat />
	</div>
	</div>
	);
	};

	export default Home;
