	'use client';

	import { useRef } from 'react';

	export default function CartForm() {
	const produitIdRef = useRef(null);
	const quantiteRef = useRef(null);

	async function handleSubmit(e) {
	e.preventDefault();
	const produitId = produitIdRef.current.value;
	const quantite = quantiteRef.current.value;

	const res = await fetch('http://localhost:8080/api/achat/panier', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ produitId: Number(produitId), quantite: Number(quantite) })
	});
	if (res.ok) {
	alert('Produit ajouté au panier');
	// Optionnel : réinitialiser le formulaire
	produitIdRef.current.value = '';
	quantiteRef.current.value = 1;
	} else {
	const error = await res.text();
	alert('Erreur: ' + error);
	}
	}

	return (
	<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow" data-aos="fade-up">
	<h2 className="text-2xl font-bold mb-4 text-center">Ajouter au Panier</h2>
	<div className="mb-4">
		<label className="block text-gray-700 mb-2">ID du Produit</label>
		<input 
		type="number" 
		ref={produitIdRef} 
		className="w-full p-2 border rounded" 
		placeholder="Produit ID" 
		required 
		/>
	</div>
	<div className="mb-4">
		<label className="block text-gray-700 mb-2">Quantité</label>
		<input 
		type="number" 
		ref={quantiteRef} 
		className="w-full p-2 border rounded" 
		placeholder="Quantité" 
		min="1" 
		defaultValue={1}
		required 
		/>
	</div>
	<button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
		Ajouter
	</button>
	</form>
	);
	}
