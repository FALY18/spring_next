'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import CartForm from '../../app/addpanier/page';

export default function PanierPage() {
  const clientIdRef = useRef(null);
  const modePaiementRef = useRef(null);
  const router = useRouter();

  async function handleValidation(e) {
    e.preventDefault();
    const clientId = clientIdRef.current.value;
    const modePaiement = modePaiementRef.current.value;

    const res = await fetch('http://localhost:8080/api/achat/valider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: Number(clientId), modePaiement })
    });
    if (res.ok) {
      alert('Panier validé en achat');
      router.push('/historique');
    } else {
      const error = await res.text();
      alert('Erreur: ' + error);
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">Votre Panier</h1>
      <CartForm />
      <form onSubmit={handleValidation} className="max-w-md mx-auto p-4 bg-white rounded shadow mt-8" data-aos="fade-up">
        <h2 className="text-xl font-bold mb-4 text-center">Valider le Panier</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">ID du Client</label>
          <input 
            type="number" 
            ref={clientIdRef} 
            className="w-full p-2 border rounded" 
            placeholder="Client ID" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Mode de Paiement</label>
          <input 
            type="text" 
            ref={modePaiementRef} 
            className="w-full p-2 border rounded" 
            placeholder="carte, paypal, ..." 
            required 
          />
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Valider le Panier
        </button>
      </form>
    </main>
  );
}
