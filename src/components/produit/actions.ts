'use server';

import { Product } from '@/types/product';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = 'http://localhost:8080/api/produits';

export async function addProduct(product: Omit<Product, 'id'>) {
	console.log('Tentative d\'ajout du produit:', product);

	try {
		const response = await fetch(API_BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
		});

		if (!response.ok) {
			return {
				success: false,
				message: 'Erreur lors de l\'ajout du produit',
			};
		}

		const data = await response.json();
		revalidatePath('/');
		return {
			success: true,
			message: 'Produit ajouté avec succès',
			data,
		};

	} catch (error) {
		console.error('Exception lors de l\'ajout du produit:', error);
		return {
			success: false,
			message: 'Exception lors de l\'ajout du produit',
		};
	}
}

export async function getProducts(): Promise<Product[]> {
	try {
		const response = await fetch(API_BASE_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			console.error('Erreur lors de la récupération des produits. Statut:', response.status);
			throw new Error('Erreur lors de la récupération des produits');
		}

		const products = await response.json();
		return products;

	} catch (error) {
		console.error('Exception lors de la récupération des produits:', error);
		throw error;
	}
}

export async function deleteProduct(productId: string) {
	try {
		const response = await fetch(`${API_BASE_URL}/${productId}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			return {
				success: false,
				message: `Erreur lors de la suppression du produit (code ${response.status})`,
			};
		}

		revalidatePath('/');
		return {
			success: true,
			message: `Produit supprimé avec succès`,
		};

	} catch (error) {
		console.error('Erreur de suppression du produit:', error);
		return {
			success: false,
			message: 'Exception lors de la suppression du produit',
		};
	}
}

export async function updateProduct(product: Product) {
	try {
		const response = await fetch(`${API_BASE_URL}/${product.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nom: product.nom,
				description: product.description,
				prix: product.prix,
				quantiteStock: product.quantiteStock,
				categorie: product.categorie,
				imageUrl: product.imageUrl,
			}),
		});

		if (!response.ok) {
			return {
				success: false,
				message: 'Erreur lors de la mise à jour du produit',
			};
		}

		const data = await response.json();
		revalidatePath('/');
		return {
			success: true,
			message: 'Produit mis à jour avec succès',
			data,
		};

	} catch (error) {
		console.error('Erreur de mise à jour du produit:', error);
		return {
			success: false,
			message: 'Exception lors de la mise à jour du produit',
		};
	}
}
