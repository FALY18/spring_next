import { Product } from "@/types/product";

export const handlePassClick = (produit: Product, setSelectedProduct: Function, setIsFormOpen: Function) => {
	setSelectedProduct(produit);
	setIsFormOpen(true);
};

export const handleCloseForm = (setIsFormOpen: Function, setSelectedProduct: Function) => {
	setIsFormOpen(false);
	setSelectedProduct(null);
};

export const handleEditClick = (produit: Product, setEditedProduct: Function, setIsEditOpen: Function) => {
	setEditedProduct({ ...produit });
	setIsEditOpen(true);
};

export const handleInputChange = (
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	editedProduct: Product | null,
	setEditedProduct: Function
) => {
	if (editedProduct) {
		setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
	}
};


export const handleAddClick = (setIsAddOpen: Function) => {
	setIsAddOpen(true);
};

export const handleAddInputChange = (
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	newProduct: Product,
	setNewProduct: Function
) => {
	setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
};

