"use client";

import { useState, useEffect } from "react";
import { getProducts, deleteProduct, updateProduct } from "./actions";
import { Product } from "@/types/product";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import FormulaireAchat from "../acceuil/formAchat";

export default function ListeProduits() {
  const [produits, setProduits] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProduits, setFilteredProduits] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const produitsData = await getProducts();
        setProduits(produitsData);
        setFilteredProduits(produitsData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduits();
  }, []);

  useEffect(() => {
    let filtered = produits.filter((produit) =>
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((produit) => produit.categorie === selectedCategory);
    }

    setFilteredProduits(filtered);
  }, [searchTerm, selectedCategory, produits]);

  // Ouvrir formulaire d'achat
  const handlePassClick = (produit: Product) => {
    setSelectedProduct(produit);
    setIsFormOpen(true);
  };

  // Fermer formulaire d'achat
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  // Ouvrir formulaire de modification
  const handleEditClick = (produit: Product) => {
    setEditedProduct({ ...produit });
    setIsEditOpen(true);
  };

  // Mettre à jour les valeurs modifiées
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    }
  };

  // Sauvegarder les modifications
  const handleSaveEdit = async () => {
    if (editedProduct) {
      await updateProduct(editedProduct);
      setProduits((prevProduits) =>
        prevProduits.map((p) => (p.id === editedProduct.id ? editedProduct : p))
      );
      setIsEditOpen(false);
    }
  };

  // Supprimer un produit
  const handleDeleteClick = async (id: string) => {
    await deleteProduct(id);
    setProduits((prevProduits) => prevProduits.filter((p) => p.id !== id));
  };

  return (
    <div id="products" className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Liste des produits</h2>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative w-full md:w-1/3">
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les catégories</option>
            <option value="Informatique">Informatique</option>
            <option value="Maison">Maison</option>
            <option value="Mode">Mode</option>
          </select>
        </div>
      </div>

      {/* Affichage des produits */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduits.length > 0 ? (
          filteredProduits.map((produit) => (
            <div key={produit.id} className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
              <img src={produit.imageUrl} alt={produit.nom} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{produit.nom}</h3>
                <p className="text-gray-400 mb-4">{produit.description}</p>
                <p className="text-lg font-bold mb-2 text-blue-400">Prix: {produit.prix} €</p>
                <p className="text-gray-500">En stock: {produit.quantiteStock}</p>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handlePassClick(produit)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => handleEditClick(produit)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center"
                  >
                    <Edit size={16} className="mr-1" /> Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClick(produit.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Aucun produit trouvé</p>
        )}
      </div>

      {/* Affichage du formulaire d'achat */}
      {isFormOpen && selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <FormulaireAchat produit={selectedProduct} onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {/* Affichage du formulaire d'édition */}
      {isEditOpen && editedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Modifier le produit</h3>
            <input
              type="text"
              name="nom"
              value={editedProduct.nom}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <button onClick={handleSaveEdit} className="w-full bg-green-500 text-white p-2 rounded-md">
              Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
