import { Product } from "@/types/product";
import { getProducts, deleteProduct, updateProduct, addProduct } from "./actions";

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
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCategory) {
    filtered = filtered.filter((produit) => produit.categorie === selectedCategory);
  }

  return filtered;
};

// Supprimer un produit et mettre à jour la liste des produits
export const deleteProduit = async (id: string, setProduits: Function) => {
	try {
	  await deleteProduct(id);
	  setProduits((prevProduits: Product[]) => prevProduits.filter((p) => p.id !== id));
	} catch (error) {
	  console.error("Erreur lors de la suppression du produit :", error);
	}
      };
      

// Mettre à jour un produit
export const saveEditedProduit = async (editedProduct: Product, setProduits: Function) => {
  await updateProduct(editedProduct);
  setProduits((prevProduits: Product[]) =>
    prevProduits.map((p) => (p.id === editedProduct.id ? editedProduct : p))
  );
};

export const addNewProduct = async (newProduct: Omit<Product, "id">, setProduits: Function) => {
	try {
	  const createdProduct = await addProduct(newProduct);
	  setProduits((prevProduits: Product[]) => [...prevProduits, createdProduct]);
	} catch (error) {
	  console.error("Erreur lors de l'ajout du produit:", error);
	}
      };
      