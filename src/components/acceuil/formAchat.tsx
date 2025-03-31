"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Product } from "@/types/product";
import { addToCart,validatePurchase  } from "./cartForm";
import HistoriqueAchats from "./historiqueAchat";


interface FormulaireAchatProps {
  produit: Product | null;
  onClose: () => void;
}

export default function FormulaireAchat({ produit, onClose }: FormulaireAchatProps) {
  // Si le produit n'est pas encore défini, on affiche un loader
  if (!produit) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Chargement du produit...</p>
        <button onClick={onClose} className="mt-2 w-full bg-gray-400 text-white p-2 rounded-md">
          Annuler
        </button>
      </div>
    );
  }

  // États pour la quantité et pour la validation d'achat
  const [quantity, setQuantity] = useState(1);
  const [clientId, setClientId] = useState("");
  const [modePaiement, setModePaiement] = useState("");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(produit.id, quantity);
      alert("Produit ajouté au panier !");
    } catch (error) {
      alert("Erreur lors de l'ajout au panier.");
    }
  };

  const handleConfirmPurchase = async () => {
    const id = parseInt(clientId);
    if (isNaN(id) || modePaiement.trim() === "") {
      alert("Veuillez renseigner un ID client valide et un mode de paiement.");
      return;
    }
    try {
      await validatePurchase(id, modePaiement);
      alert("Achat confirmé !");
      onClose();
    } catch (error) {
      alert("---*****Erreur lors de la validation de l'achat.");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <Tabs defaultValue="addToCart">
        <TabsList className="flex space-x-2 mb-4">
          <TabsTrigger value="addToCart" className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
            Ajouter au Panier
          </TabsTrigger>
          <TabsTrigger value="validation" className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
            Validation d'Achat
          </TabsTrigger>
        </TabsList>

        {/* Onglet Ajout au panier */}
        <TabsContent value="addToCart">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="block text-sm font-semibold mb-2">Produit :</p>
            <p className="block w-full p-2 border rounded-md mb-4">{produit.nom}</p>
            <p className="block text-sm font-semibold mb-2">Prix unitaire :</p>
            <p className="block w-full p-2 border rounded-md mb-4">{produit.prix} €</p>

            <label className="block text-sm font-semibold mb-2">Quantité :</label>
            <input
              type="number"
              className="block w-full p-2 border rounded-md"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />

            <button onClick={handleAddToCart} className="mt-4 w-full bg-green-500 text-white p-2 rounded-md">
              Ajouter au Panier
            </button>
          </div>
        </TabsContent>

        {/* Onglet Validation d'achat */}
        <TabsContent value="validation">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">ID client :</label>
              <input
                type="text"
                className="block w-full p-2 border rounded-md"
                placeholder="Saisissez votre ID client"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Mode de paiement :</label>
              <input
                type="text"
                className="block w-full p-2 border rounded-md"
                placeholder="Saisissez votre mode de paiement"
                value={modePaiement}
                onChange={(e) => setModePaiement(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-semibold mb-4">Résumé de votre commande</h3>
            <div className="flex justify-between mb-4">
              <span>Produit :</span>
              <span>{produit.nom}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Quantité :</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total :</span>
              <span>{(quantity * produit.prix).toFixed(2)} €</span>
            </div>

            <button onClick={handleConfirmPurchase} className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md">
              Confirmer l'Achat
            </button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        {/* Affichage de l'historique des achats */}
        <h2>Historique des Achats</h2>
        {/* <HistoriqueAchats clientId={clientId} /> */}
      </div>

      <button onClick={onClose} className="mt-2 w-full bg-gray-400 text-white p-2 rounded-md">
        Annuler
      </button>
    </div>
  );
}
