// components/ProductForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { addProduct } from './actions';

const ProductForm = () => {
	const [product, setProduct] = useState({
		nom: '',
		description: '',
		prix: 0,
		quantiteStock: 0,
		imageUrl: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setProduct((prevProduct) => ({
			...prevProduct,
			[name]: name === 'prix' || name === 'quantiteStock' ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await addProduct(product);
			setProduct({
				nom: '',
				description: '',
				prix: 0,
				quantiteStock: 0,
				imageUrl: '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="nom" className="block text-sm font-medium text-gray-700">
					Nom
				</label>
				<input
					type="text"
					name="nom"
					id="nom"
					value={product.nom}
					onChange={handleChange}
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
				/>
			</div>
			<div>
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					name="description"
					id="description"
					value={product.description}
					onChange={handleChange}
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
				/>
			</div>
			<div>
				<label htmlFor="prix" className="block text-sm font-medium text-gray-700">
					Prix
				</label>
				<input
					type="number"
					name="prix"
					id="prix"
					value={product.prix}
					onChange={handleChange}
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
				/>
			</div>
			<div>
				<label htmlFor="quantiteStock" className="block text-sm font-medium text-gray-700">
					Quantité en Stock
				</label>
				<input
					type="number"
					name="quantiteStock"
					id="quantiteStock"
					value={product.quantiteStock}
					onChange={handleChange}
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
				/>
			</div>
			<div>
				<label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
					URL de l'image
				</label>
				<input
					type="text"
					name="imageUrl"
					id="imageUrl"
					value={product.imageUrl}
					onChange={handleChange}
					required
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
				/>
			</div>
			<button
				type="submit"
				className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
			>
				Ajouter le Produit
			</button>
		</form>
	);
};

export default ProductForm;
