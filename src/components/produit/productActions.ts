	import { Product } from "@/types/product";

	// Gérer l'ouverture du formulaire d'achat
	export const handlePassClick = (produit: Product, setSelectedProduct: Function, setIsFormOpen: Function) => {
	setSelectedProduct(produit);
	setIsFormOpen(true);
	};

	// Fermer le formulaire d'achat
	export const handleCloseForm = (setIsFormOpen: Function, setSelectedProduct: Function) => {
	setIsFormOpen(false);
	setSelectedProduct(null);
	};

	// Ouvrir le formulaire d'édition
	export const handleEditClick = (produit: Product, setEditedProduct: Function, setIsEditOpen: Function) => {
	setEditedProduct({ ...produit });
	setIsEditOpen(true);
	};

	// Gérer les changements dans les champs d'entrée du formulaire
	export const handleInputChange = (
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	editedProduct: Product | null,
	setEditedProduct: Function
	) => {
	if (editedProduct) {
	setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
	}
	};


	// Ouvrir le formulaire d'ajout
	export const handleAddClick = (setIsAddOpen: Function) => {
	setIsAddOpen(true);
	};

	// Gérer les changements dans le formulaire d'ajout
	export const handleAddInputChange = (
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	newProduct: Product,
	setNewProduct: Function
	) => {
	setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
	};

