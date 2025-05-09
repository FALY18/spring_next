// 1. types/achat.ts
export interface Achat {
	id: number;
	clientId: number;
	prixTotal: number;
	modePaiement: string;
	dateAchat: string; // ISO string
}