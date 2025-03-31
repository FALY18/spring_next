"use client";
import { useState, useEffect } from "react";
import { getHistoriqueAchats } from "./cartForm";

interface Achat {
  id: number;
  prixTotal: number;
  modePaiement: string;
  dateAchat: string;
  paniers: { produitId: number; quantite: number }[];
}

interface HistoriqueAchatsProps {
  clientId: string;
}

export default function HistoriqueAchats({ clientId }: HistoriqueAchatsProps) {
  const [historique, setHistorique] = useState<Achat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const achats = await getHistoriqueAchats(clientId);
        setHistorique(achats);
      } catch (err) {
        setError("Erreur lors de la récupération de l'historique des achats");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorique();
  }, [clientId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Historique des achats</h1>
      <ul>
        {historique.map((achat) => (
          <li key={achat.id}>
            <p>Id Achat: {achat.id}</p>
            <p>Prix Total: {achat.prixTotal} €</p>
            <p>Mode de paiement: {achat.modePaiement}</p>
            <p>Date: {new Date(achat.dateAchat).toLocaleString()}</p>
            <p>
              Produits:{" "}
              {achat.paniers
                .map((p) => `Produit ID: ${p.produitId} Quantité: ${p.quantite}`)
                .join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
