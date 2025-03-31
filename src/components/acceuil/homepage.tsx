	"use client";
	import { StatistiquesGraphique } from "../chart/graph";
	//import FormulaireAchat from "./formAchat";
	import { Component } from "./cercle";
	import { Componentdgr } from "./diagram";

	const Home = () => {
	return (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
	
		<div className="space-y-4 p-4">
			<div>
				<Componentdgr/>
			</div>
		</div>

		<div className="space-y-4 p-[40px]">
			<Component />
		</div>
	</div>
	);
	};

	export default Home;
