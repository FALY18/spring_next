import React from 'react';

export default function ProductModal({
	product,
	onClose,
}: {
	product: any;
	onClose: () => void;
}) {
	if (!product) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
			{/* Conteneur style "story" */}
			<div className="relative w-[500px] h-[400px] rounded-xl overflow-hidden shadow-2xl">
				{/* Image de fond */}
				<img
					src={product.imageUrl}
					alt={product.nom}
					className="absolute inset-0 w-full h-full object-cover"
				/>

				{/* Voile sombre pour lisibilité */}
				<div className="absolute inset-0 bg-black bg-opacity-40" />

				{/* Bouton de fermeture */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-300 text-2xl font-bold z-10 bg-red-400 p-2 rounded-full"
				>
					✕
				</button>

				{/* Détails du produit */}
				<div className="absolute bottom-0 left-0 p-6 text-white z-10 bg-black bg-opacity-50 w-full">
					<h2 className="text-2xl font-bold mb-1">{product.nom}</h2>
					<p className="text-sm mb-2">{product.description}</p>
					<p className="text-lg font-semibold text-yellow-400">Prix : {product.prix} €</p>
					<p className="text-xs text-gray-300">Stock : {product.quantiteStock}</p>
				</div>
			</div>
		</div>
	);
}
