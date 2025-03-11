// app/actions.ts
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
		console.error('Erreur lors de l\'ajout du produit. Code de statut:', response.status);
		throw new Error('Erreur lors de l\'ajout du produit');
	}
	console.log('Produit ajouté avec succès');
	revalidatePath('/');
	} catch (error) {
		console.error('Exception lors de l\'ajout du produit:', error);
		throw error; // Rejeter l'erreur après l'avoir enregistrée
	}
}

export async function getProducts(): Promise<Product[]> {
console.log('Tentative de récupération des produits');

try {
	const response = await fetch(API_BASE_URL, {
		method: 'GET',
		headers: {
		'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		console.error('Erreur lors de la récupération des produits. Code de statut:', response.status);
		throw new Error('Erreur lors de la récupération des produits');
	}

	const products = await response.json();
	console.log('Produits récupérés avec succès:', products);
	return products;

	} catch (error) {
		console.error('Exception lors de la récupération des produits:', error);
		throw error; // Rejeter l'erreur après l'avoir enregistrée
	}
}



export async function deleteProduct(productId: string) {
	try {
	  const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
	    method: "DELETE",
	  });
      
	  if (!response.ok) {
	    throw new Error("Erreur lors de la suppression du produit");
	  }
	} catch (error) {
	  console.error("Erreur de suppression:", error);
	}
      }

      
export async function updateProduct(product: any) {
	try {
	  const response = await fetch(`http://localhost:5000/api/products/${product.id}`, {
	    method: "PUT",
	    headers: {
	      "Content-Type": "application/json",
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
	    throw new Error("Erreur lors de la mise à jour du produit");
	  }
      
	  return await response.json();
	} catch (error) {
	  console.error("Erreur de mise à jour:", error);
	}
 }
      