'use server';

import { Achat } from '@/types/achat';

export async function getHistoriqueAchats(clientId: number): Promise<Achat[]> {
  try {
    const res = await fetch(`http://localhost:8080/api/achats/historique/${clientId}`);
    if (!res.ok) throw new Error('Échec de la récupération de l\'historique');
    const response = await res.json();
    console.log('----------*Historique des achats:', response);

  } catch (err) {
    console.error('Erreur de chargement de l\'historique:', err);
    return [];
  }
}