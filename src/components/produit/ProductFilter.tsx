import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { fetchFilteredProducts } from './filterAction'; 

interface ProductFilterProps {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	selectedCategory: string;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
	filterOption: string;
	setFilterOption: React.Dispatch<React.SetStateAction<string>>;
	setFilteredProduits: React.Dispatch<React.SetStateAction<any[]>>; // Définir un setter pour les produits filtrés
}

const ProductFilter: React.FC<ProductFilterProps> = ({
	searchTerm,
	setSearchTerm,
	selectedCategory,
	setSelectedCategory,
	filterOption,
	setFilterOption,
	setFilteredProduits,
}) => {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value);
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterOption(event.target.value);
	};

	// Fonction pour contacter le backend avec les paramètres de filtrage
	useEffect(() => {
                async function fetchData() {
                        const filteredProducts = await fetchFilteredProducts(searchTerm, selectedCategory, filterOption);
                        console.log('---------------setFilteredProduits---:', setFilteredProduits);  // Vérification de la fonction
                        setFilteredProduits(filteredProducts);  // Appel de la fonction pour mettre à jour les produits filtrés
                }
                fetchData();
	}, [searchTerm, selectedCategory, filterOption, setFilteredProduits]);


	return (
		<div className="mb-6 p-4 bg-gray-800 rounded-lg">

			<div className="flex justify-between items-center">
				{/* Recherche avec l'icône */}
				<div className="relative flex-grow">
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder="Rechercher un produit..."
						className="bg-gray-800 text-white px-4 py-1 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-800 w-[300px]"
					/>
					<Search className="absolute left-3 -translate-y-1/2 top-1/2 text-white border-r-2" size={16} />
				</div>
	

				{/* Catégorie - Liste déroulante */}
				<div className="relative flex-shrink-0 ml-4">
					<select
						value={selectedCategory}
						onChange={handleCategoryChange}
						className="bg-gray-800 text-white px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						<option value="">Toutes les catégories</option>
						<option value="Papertie">Papertie</option>
						<option value="Outils d'écriture">Outils d'écriture</option>
						<option value="Cartables et sacs">Cartables et sacs</option>
			        <option value="autres">Autres</option>
					</select>
				</div>

				{/* Filtres - Liste déroulante */}
				<div className="relative flex-shrink-0 ml-4">
					<select
						value={filterOption}
						onChange={handleFilterChange}
						className="bg-gray-800 text-white px-4 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						<option value="">Tous les produits</option>
						<option value="new">Nouveaux produits</option>
						<option value="top">Produits les plus achetés</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;