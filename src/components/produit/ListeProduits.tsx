"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import FormulaireAchat from "../acceuil/formAchat";
import ProductFilter from "./ProductFilter";
import AjouterProduit from "./ajoutForm";
import { fetchProduits, filterProduits, deleteProduit } from "./ProductUtilis";
import { handlePassClick, handleCloseForm, handleEditClick, handleInputChange, handleAddClick } from "./productActions";
import { updateProduct } from "./actions";
import ImageWithSkeleton from "../ ImageWithSkeleton";
import withAuth from "@/lib/withAuth";

function ListeProduits() {
const [produits, setProduits] = useState<Product[]>([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [filterOption, setFilterOption] = useState(""); // Option de filtre supplémentaire
const [filteredProduits, setFilteredProduits] = useState<Product[]>([]);

const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
const [isEditOpen, setIsEditOpen] = useState(false);
const [editedProduct, setEditedProduct] = useState<Product | null>(null);
const [isAddOpen, setIsAddOpen] = useState(false);

useEffect(() => {
        async function fetchData() {
        const produitsData = await fetchProduits();
        setProduits(produitsData);
                setFilteredProduits(produitsData); // Initialisation avec tous les produits
        }
        fetchData();
}, []);

useEffect(() => {
// Applique les filtres dès qu'il y a une modification sur l'un d'eux
        const filtered = filterProduits(produits, searchTerm, selectedCategory, filterOption);
        setFilteredProduits(filtered);
}, [searchTerm, selectedCategory, filterOption, produits]); // Les dépendances incluent filterOption maintenant

const handleSaveEdit = async () => {
        if (editedProduct) {
                await updateProduct(editedProduct);
                setProduits((prevProduits) =>
                        prevProduits.map((p) => (p.id === editedProduct.id ? editedProduct : p))
                );
                setIsEditOpen(false);
        }
};

const baseUrl = "/images/";

return (
        <div id="products" className="container mx-auto p-6">	
                <div className="flex justify-start m-4">
                        <button
                        onClick={() => handleAddClick(setIsAddOpen)}
                        className="absolute bg-green-800 px-4 ml-[390px] mt-[30px] py-2 rounded-lg border-none hover:bg-green-700 font-bold transition text-xs text-gray-400 z-10"
                        >
                        Nouveaux produit
                        </button>
                </div>

                <ProductFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                setFilteredProduits={setFilteredProduits} // Passez la fonction ici
                />

                <div className="grid gap-6  lg:grid-cols-4">
                        {filteredProduits.length > 0 ? (
                        filteredProduits.map((produit) => (
                        <div key={produit.id} className="bg-gray-900 shadow-md rounded-lg overflow-hidden">

                                <ImageWithSkeleton
                                        src={`${baseUrl}${produit.imageUrl}`} // On combine l'URL avec l'image stockée en base
                                        alt={produit.nom}
                                        style={{ width: "450px", height: "150px", objectFit: "cover" }}
                                />

                                <div className="p-4 ">
                                        <h3 className="text-xs font-semibold mb-2 text-white">{produit.nom}</h3>
                                        <p className="text-xs text-gray-400 mb-4">{produit.description}</p>
                                        <p className="text-xs font-bold mb-2 text-blue-400">Prix: {produit.prix} €</p>
                                        <p className="text-xs text-gray-500">En stock: {produit.quantiteStock}</p>

                                        <div className="text-xs flex space-x-2 mt-3">
                                                <button
                                                        onClick={() => handlePassClick(produit, setSelectedProduct, setIsFormOpen)}
                                                        className=" bg-green-800 text-white px-4 py-2 rounded-lg border-none hover:bg-green-700 font-bold transition text-xs"
                                                >
                                                Pass
                                                </button>
                                                
                                                <button
                                                        onClick={() => handleEditClick(produit, setEditedProduct, setIsEditOpen)}
                                                        className="bg-green-800 text-white px-4 py-2 rounded-lg border-none hover:bg-green-700 font-bold transition text-xs"
                                                        >
                                                        Modifier
                                                </button>

                                                <button
                                                        onClick={() => {
                                                        if (produit.id) {
                                                                console.log("Suppression du produit ID:", produit.id);
                                                                deleteProduit(produit.id, setProduits);
                                                        } else {
                                                                console.error("ID du produit introuvable !");
                                                        }
                                                        }}
                                                        className="bg-red-400 text-white px-4 py-2 rounded-lg border-none hover:bg-green-700 font-bold transition text-xs"
                                                        >
                                                        Supprimer
                                                </button>
                                        </div>
                                </div>
                        </div>
                        ))
                        ) : (
                        <p className="text-center text-gray-400">Aucun produit trouvé</p>
                        )}
                </div>

                {isFormOpen && selectedProduct && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <FormulaireAchat
                                                produit={selectedProduct}
                                                onClose={() => handleCloseForm(setIsFormOpen, setSelectedProduct)}
                                        />
                                </div>
                        </div>
                )}

                {isEditOpen && editedProduct && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                        <h3 className="text-lg font-semibold mb-4">Modifier le produit</h3>

                                        <input
                                                type="text"
                                                name="nom"
                                                value={editedProduct.nom}
                                                onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                                                placeholder="Nom du produit"
                                                className="w-full p-2 border rounded-md mb-2"
                                        />

                                        <textarea
                                                name="description"
                                                value={editedProduct.description}
                                                onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                                                placeholder="Description du produit"
                                                className="w-full p-2 border rounded-md mb-2"
                                        />

                                        <input
                                                type="number"
                                                name="prix"
                                                value={editedProduct.prix}
                                                onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                                                placeholder="Prix du produit"
                                                className="w-full p-2 border rounded-md mb-2"
                                        />

                                        <input
                                                type="number"
                                                name="quantiteStock"
                                                value={editedProduct.quantiteStock}
                                                onChange={(e) => handleInputChange(e, editedProduct, setEditedProduct)}
                                                placeholder="Quantité en stock"
                                                className="w-full p-2 border rounded-md mb-2"
                                        />

                                        <button onClick={handleSaveEdit} className="w-full bg-green-500 text-white p-2 rounded-md">
                                                Sauvegarder
                                        </button>
                                </div>
                        </div>
                )}

                {isAddOpen && (
                        <AjouterProduit onClose={() => setIsAddOpen(false)} setProduits={setProduits} />
                )}
        </div>
        );
}

export default withAuth(ListeProduits, ['admin','client']);