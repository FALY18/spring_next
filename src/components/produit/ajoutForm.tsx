import { useState } from "react";
import { Product } from "@/types/product";
import { addProduct } from "./actions";

interface Props {
  onClose: () => void;
  setProduits: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function AjouterProduit({ onClose, setProduits }: Props) {
  const [newProduct, setNewProduct] = useState<Product>({
    id: Math.random().toString(36).substr(2, 9), // Génération d'un ID temporaire
    nom: "",
    description: "",
    prix: 0,
    quantiteStock: 0,
    imageUrl: "", // Stockera uniquement le NOM du fichier image
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Vérification du type de fichier
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner une image valide.");
        return;
      }

      // Met à jour l'aperçu de l'image
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);

      // Stocke seulement le NOM du fichier
      setNewProduct((prev) => ({ ...prev, imageUrl: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
      
	if (!newProduct.nom || !newProduct.prix || !newProduct.imageUrl) {
	  alert("Veuillez remplir tous les champs !");
	  return;
	}
      
	try {
	  // On extrait l'ID pour ne pas l'envoyer au backend.
	  const { id, ...productWithoutId } = newProduct;
      
	  // Appel à la fonction addProduct qui envoie la requête au backend.
	  const createdProduct = await addProduct(productWithoutId);
      
	  // Mise à jour de l'état avec le produit retourné (incluant l'ID généré par la BDD)
	  setProduits((prev) => [...prev, createdProduct]);
      
	  // Ferme le formulaire
	  onClose();
	} catch (error) {
	  console.error("Erreur lors de l'ajout du produit:", error);
	  alert("Une erreur est survenue lors de l'ajout du produit.");
	}
      };
      

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Ajouter un produit</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            value={newProduct.nom}
            onChange={handleInputChange}
            placeholder="Nom du produit"
            className="w-full p-2 border rounded-md mb-2"
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Description du produit"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="number"
            name="prix"
            value={newProduct.prix}
            onChange={handleInputChange}
            placeholder="Prix du produit"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="number"
            name="quantiteStock"
            value={newProduct.quantiteStock}
            onChange={handleInputChange}
            placeholder="Quantité en stock"
            className="w-full p-2 border rounded-md mb-2"
          />

          {/* Input pour uploader l'image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          {/* Aperçu de l'image sélectionnée */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-32 h-32 object-cover mx-auto mb-2 border"
            />
          )}

          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
