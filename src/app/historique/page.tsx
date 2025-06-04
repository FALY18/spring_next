	export const dynamic = 'force-dynamic';
	async function getHistorique() {
		try {
		const res = await fetch("http://localhost:8080/api/achat/historique/2", { cache: "no-store" });
	
		const text = await res.text();
		console.log(" Réponse brute du backend :", text);
	
		if (!res.ok) {
			console.error(" Erreur HTTP :", res.status, res.statusText);
		throw new Error("Le serveur a renvoyé une erreur !");
		}
	
		return JSON.parse(text); 
		} catch (error) {
		console.error("Erreur lors de la récupération :", error);
		return null; 
		}
	}
	
	
	export default async function HistoriquePage() {
		let achats = [];
	
		try {
		achats = await getHistorique();
		} catch (error) {
		return (
		<main className="container mx-auto p-4 text-center">
		<h1 className="text-3xl font-bold text-red-600">Erreur lors du chargement de l’historique</h1>
		<p className="text-gray-500">Veuillez réessayer plus tard.</p>
		</main>
		);
		}
	
		return (
		<main className="container mx-auto p-4">
		<h1 className="text-3xl font-bold text-center mb-6" data-aos="fade-up">
		Historique des Achats
		</h1>
		{Array.isArray(achats) && achats.length > 0 ? (
		<ul className="space-y-4">
			{achats.map((achat) =>
			achat && achat.id ? (
			<li key={achat.id} className="p-4 bg-white rounded shadow" data-aos="fade-up">
			<div>
				<strong>Date:</strong> {achat.dateAchat}
			</div>
			<div>
				<strong>Total:</strong> {achat.prixTotal} €
			</div>
			<div>
				<strong>Mode de paiement:</strong> {achat.modePaiement}
			</div>
			</li>
			) : (
			<p key={Math.random()} className="text-red-500">⚠️ Erreur dans un achat</p>
			)
			)}
		</ul>
		) : (
		<p className="text-center text-gray-500">Aucun achat trouvé.</p>
		)}
		</main>
		);
	}
	
