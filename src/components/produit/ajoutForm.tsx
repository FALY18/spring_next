import { useState } from "react";
import { Product } from "@/types/product";
import { addProduct } from "./actions";
import { toast } from "sonner";

interface Props {
	onClose: () => void;
	setProduits: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function AjouterProduit({ onClose, setProduits }: Props) {
	const [newProduct, setNewProduct] = useState<Product>({
		id: Math.random().toString(36).substr(2, 9), 
		nom: "",
		description: "",
		prix: 0,
		quantiteStock: 0,
		imageUrl: "", 
	});

	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (!file.type.startsWith("image/")) {
				alert("Veuillez sélectionner une image valide.");
				return;
			}

			const imageURL = URL.createObjectURL(file);
			setImagePreview(imageURL);

			setNewProduct((prev) => ({ ...prev, imageUrl: file.name }));
		}
	};

        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
        
                if (!newProduct.nom || !newProduct.prix || !newProduct.imageUrl) {
                toast.error("Veuillez remplir tous les champs !");
                return;
                }
        
                try {
                const { id, ...productWithoutId } = newProduct;
        
                const result = await addProduct(productWithoutId);
        
                if (result.success && result.data) {
                toast.success(result.message || "Produit ajouté !");
                setProduits((prev) => [...prev, result.data]);
                onClose();
                } else {
                toast.error(result.message || "Erreur lors de l'ajout du produit");
                }
                } catch (error) {
                toast.error("Une erreur est survenue lors de l'ajout du produit.");
                console.error(error);
                }
        };      
			

	return (
		<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-95 z-50">
			<div className=" max-w-md bg-gray bg-opacity-10  p-6 rounded-lg shadow-2xl w-96">
				<h3 className="text-xl font-thin text-center text-blue-700 mb-7">ajouter un produit</h3>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="nom"
						value={newProduct.nom}
						onChange={handleInputChange}
						placeholder="Nom du produit"
						className="w-full p-2 border border-gray-300 bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
					/>
					<textarea
						name="description"
						value={newProduct.description}
						onChange={handleInputChange}
						placeholder="Description du produit"
						className="w-full p-2 border border-gray-300 bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
					/>
					<input
						type="number"
						name="prix"
						value={newProduct.prix}
						onChange={handleInputChange}
						placeholder="Prix du produit"
						className="w-full p-2 border border-gray-300 bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
					/>
					<input
						type="number"
						name="quantiteStock"
						value={newProduct.quantiteStock}
						onChange={handleInputChange}
						placeholder="Quantité en stock"
						className="w-full p-2 border border-gray-300 bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
					/>

					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="w-full p-2 border border-gray-300 bg-black text-gray-100 opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
					/>

					{imagePreview && (
						<img
							src={imagePreview}
							alt="Aperçu"
							className="w-32 h-32 object-cover mx-auto mb-2 border"
						/>
					)}

					<button type="submit" className="w-full bg-green-800 text-gray-400 p-2 rounded-md">
						Ajouter
					</button>
				</form>
			</div>
		</div>
	);
}
