"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import FormulaireAchat from "../acceuil/formAchat";
import ProductFilter from "./ProductFilter";
import AjouterProduit from "./ajoutForm";
import ProductModal from "./ProductModal";
import { fetchProduits, filterProduits, deleteProduit } from "./ProductUtilis";
import { handlePassClick, handleCloseForm, handleEditClick, handleInputChange, handleAddClick } from "./productActions";
import { updateProduct } from "./actions";
import ImageWithSkeleton from "../ ImageWithSkeleton";
import withAuth from "@/lib/withAuth";
import { toast } from "sonner";


function ListeProduits() {
const [produits, setProduits] = useState<Product[]>([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [filterOption, setFilterOption] = useState(""); 
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
		setFilteredProduits(produitsData); 
	}
	fetchData();
}, []);

useEffect(() => {
	const filtered = filterProduits(produits, searchTerm, selectedCategory, filterOption);
	setFilteredProduits(filtered);
}, [searchTerm, selectedCategory, filterOption, produits]); 

const handleSaveEdit = async () => {
	if (editedProduct) {
		await updateProduct(editedProduct);
		setProduits((prevProduits) =>
			prevProduits.map((p) => (p.id === editedProduct.id ? editedProduct : p))
		);
		setIsEditOpen(false);
	}
};

const [selectedProductDetail, setSelectedProductDetail] = useState(null);


const baseUrl = "/images/";



const [showFilter, setShowFilter] = useState(true)
const [lastScrollY, setLastScrollY] = useState(0)
const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)

useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY

        if (scrollTimeout) clearTimeout(scrollTimeout)

        if (currentScrollY > lastScrollY) {
                setScrollTimeout(setTimeout(() => {
                setShowFilter(true)
        }, 100))
        } else {
        setScrollTimeout(setTimeout(() => {
                setShowFilter(false)
        }, 100))
        }

        setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
        window.removeEventListener("scroll", handleScroll)
        if (scrollTimeout) clearTimeout(scrollTimeout)
        }
        }, [lastScrollY])



return (
	<div id="products" className="container mx-auto p-6">	

{selectedProductDetail && (
	<ProductModal
		product={{ ...selectedProductDetail, imageUrl: `${baseUrl}${selectedProductDetail.imageUrl}` }}
		onClose={() => setSelectedProductDetail(null)}
	/>
)}

		<div className="flex justify-start m-4">
			<button
			onClick={() => handleAddClick(setIsAddOpen)}
			className="absolute bg-green-800 px-4 ml-[390px] mt-[30px] py-2 rounded-lg border-none hover:bg-green-700 font-bold transition text-xs text-gray-400 z-10"
			>
			Nouveaux produit
			</button>
		</div>
		<div
	className={`
	transition-all duration-700 ease-in-out transform overflow-hidden mb-10
	${showFilter ? "max-h-[300px] opacity-100 translate-y-10" : "max-h-0 opacity-0 -translate-y-4"}
	`}
	>
	<ProductFilter
	searchTerm={searchTerm}
	setSearchTerm={setSearchTerm}
	selectedCategory={selectedCategory}
	setSelectedCategory={setSelectedCategory} 
	filterOption={filterOption}
	setFilterOption={setFilterOption}
	setFilteredProduits={setFilteredProduits}
	/>
</div>



		<div className="grid gap-6  lg:grid-cols-4">
			{filteredProduits.length > 0 ? (
			filteredProduits.map((produit) => (
			<div key={produit.id} className="bg-gray-900 shadow-md rounded-lg overflow-hidden">

		<div onClick={() => setSelectedProductDetail(produit)} className="cursor-pointer">
			<ImageWithSkeleton
				src={`${baseUrl}${produit.imageUrl}`} 
				alt={produit.nom}
				style={{ width: "450px", height: "150px", objectFit: "cover" }}
			/>
		</div>


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
				if (!produit.id) {
				console.error("ID du produit introuvable !");
				return;
				}

				toast("Confirmation de suppression", {
				description: `Voulez-vous vraiment supprimer le produit "${produit.nom}" ?`,
				action: {
					label: "Oui, supprimer",
					onClick: () => {
					console.log("Suppression du produit ID:", produit.id);
					deleteProduit(produit.id, setProduits);
					},
				},
				cancel: {
					label: "Annuler",
					onClick: () => {
					console.log("Suppression annulée");
					},
				},
				duration: 8000, 
				});
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