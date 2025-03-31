	// utils/ErrorHandler.ts

	export function handleFilterError(error: any) {
		console.error("Erreur lors du filtrage des produits", error);
	
		// Ici, vous pouvez afficher un message d'erreur spécifique au filtre.
		alert("Une erreur est survenue lors de l'application des filtres. Veuillez réessayer.");
	}
	