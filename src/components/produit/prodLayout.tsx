// app/add-product/page.tsx
import ProductForm from "./ProduitForm";

const AddProductPage = () => {
	return (
		<div className="max-w-2xl mx-auto py-8">
			<h1 className="text-2xl font-bold mb-4">Ajouter un Nouveau Produit</h1>
			<ProductForm />
		</div>
	);
};

export default AddProductPage;
