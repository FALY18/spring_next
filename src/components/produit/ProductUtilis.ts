import { Product } from "@/types/product";
import { getProducts, deleteProduct, updateProduct, addProduct } from "./actions";
import {toast, Toaster} from 'sonner'
import Router, { useRouter } from "next/router";

// Récupérer les produits
export const fetchProduits = async () => {
	try {
		const produitsData = await getProducts();
		return produitsData;
	} catch (error) {
		console.error(error);
		return [];
	}
};

// Filtrer les produits en fonction de la recherche et de la catégorie
export const filterProduits = (
	produits: Product[],
	searchTerm: string,
	selectedCategory: string
): Product[] => {
	let filtered = produits.filter((produit) =>
		produit.nom?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (selectedCategory) {
		filtered = filtered.filter((produit) => produit.categorie === selectedCategory);
	}

	return filtered;
};

// Supprimer un produit et mettre à jour la liste des produits
export const deleteProduit = async (id: string, setProduits: Function) => {
	//use router = useRouter()
	try {
		const res = await deleteProduct(id);
		if(res.success){
			toast.success("suppression reuissi!")
			setProduits((prevProduits: Product[]) => prevProduits.filter((p) => p.id !== id));
		}
	
	} catch (error) {
		toast.error("Erreur lors de la suppression du produit :");
	}
};

// Mettre à jour un produit
export const saveEditedProduit = async (editedProduct: Product, setProduits: Function) => {
	//await updateProduct(editedProduct);
	const result = await updateProduct(editedProduct);
	if(result?.success){
		toast.success("Modification reussi")
		setProduits((prevProduits: Product[]) =>
			prevProduits.map((p) => (p.id === editedProduct.id ? editedProduct : p))
		);
	}else{
		toast.error("echec de modification")
	}
};

export const addNewProduct = async (newProduct: Omit<Product, "id">, setProduits: Function) => {
	try {
		const createdProduct = await addProduct(newProduct);
		if(createdProduct.success){
			toast.success("ajout de produit avec success")
			setProduits((prevProduits: Product[]) => [...prevProduits, createdProduct]);
		}
	} catch (error) {
		toast.error("erro d'ajout....")
		//console.error("Erreur lors de l'ajout du produit:", error);
	}
};