
	const API_URL = "http://localhost:8080/api/achat";

	// Fonction pour récupérer l'historique des achats d'un client
	export const getHistoriqueAchats = async (clientId: string) => {
	try {
	const response = await fetch(`${API_URL}/historique/${clientId}`, {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
	});

	if (!response.ok) {
	throw new Error("Erreur lors de la récupération de l'historique des achats");
	}

	return await response.json();
	} catch (error) {
	console.error(error);
	throw error;
	}
	};

	// Fonction pour ajouter un produit au panier
	export const addToCart = async (produitId: number, quantite: number) => {
	const data = { produitId, quantite };

	try {
	const response = await fetch(`${API_URL}/panier`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(data),
	});

	if (!response.ok) {
	const error = await response.text();
	throw new Error(error || "Échec de l'ajout au panier.");
	}

	return await response.json();
	} catch (error) {
	throw new Error("Erreur d'ajout au panier.");
	}
	};

	// Fonction pour mettre à jour le stock après un achat validé
	export const updateStockAfterPurchase = async (clientId: number) => {
		try {
		const response = await fetch(`${API_URL}/valider/${clientId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		});
	
		if (!response.ok) {
		const error = await response.text();
		throw new Error(error || "Échec de la mise à jour du stock.");
		}
	
		return await response.json();
		} catch (error) {
		throw new Error("Erreur lors de la mise à jour du stock.");
		}
	};
	
	// Fonction pour valider un achat et mettre à jour le stock
	export const validatePurchase = async (clientId: number, modePaiement: string) => {
		const data = { clientId, modePaiement };
	
		try {
		const response = await fetch(`${API_URL}/valider`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
		});
	
		if (!response.ok) {
		const error = await response.text();
		throw new Error(error || "Échec de la validation de l'achat.");
		}
	
		// Une fois l'achat validé, on met à jour le stock
		await updateStockAfterPurchase(clientId);
	
		return await response.json();
		} catch (error) {
		throw new Error("------Erreur lors de la validation de l'achat.");
		}
	};
	
