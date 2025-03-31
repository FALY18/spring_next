	export const fetchFilteredProducts = async (
		searchTerm: string,
		selectedCategory: string,
		filterOption: string
	): Promise<any[]> => {
		try {
		let url: URL;
	
		// 🔹 Choisir le bon endpoint selon la priorité
		if (selectedCategory) {
			url = new URL(`http://localhost:8080/api/produits/categories/${selectedCategory}`);
		} else if (filterOption === "new") {
			url = new URL("http://localhost:8080/api/produits/recent");
		} else if (filterOption === "top") {
			url = new URL("http://localhost:8080/api/produits/top-selling");
		} else {
			url = new URL("http://localhost:8080/api/produits");
		}
	
		// 🔹 Ajouter le terme de recherche si présent
		if (searchTerm) {
			url.searchParams.append("search", searchTerm);
		}
	
		console.log("URL générée :", url.toString()); // Debugging
	
		// 🔹 Faire la requête GET vers le backend
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
			"Content-Type": "application/json",
			},
		});
	
		if (!response.ok) {
			throw new Error("Erreur lors de la récupération des produits filtrés");
		}
	
		return await response.json();
		} catch (error) {
		console.error("Erreur de contact avec le backend:", error);
		return [];
		}
	};
	