package com.javaweb.javaweb.service;

import com.javaweb.javaweb.model.Achat;
import com.javaweb.javaweb.model.Panier;
import com.javaweb.javaweb.repository.AchatRepository;
import com.javaweb.javaweb.repository.PanierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchatService {
    private final AchatRepository achatRepository;
    private final PanierRepository panierRepository;

    public AchatService(AchatRepository achatRepository, PanierRepository panierRepository) {
        this.achatRepository = achatRepository;
        this.panierRepository = panierRepository;
    }

    // 1️⃣ Ajouter un produit au panier
    public Panier ajouterAuPanier(Panier panier) {
        return panierRepository.save(panier);
    }


    // 2️⃣ Valider le panier et créer un achat
    public Achat validerPanier(Long clientId, String modePaiement) {
        List<Panier> paniers = panierRepository.findByAchatIsNull();

        if (paniers.isEmpty()) {
            throw new IllegalStateException("Le panier est vide !");
        }

        double prixTotal = paniers.stream()
                .mapToDouble(p -> p.getQuantite() * getPrixProduit(p.getProduitId()))
                .sum();

        Achat achat = new Achat();
        achat.setClientId(clientId);
        achat.setPrixTotal(prixTotal);
        achat.setModePaiement(modePaiement);

        Achat savedAchat = achatRepository.save(achat);

        for (Panier panier : paniers) {
            panier.setAchat(savedAchat);
            panierRepository.save(panier);
        }

        return savedAchat;
    }


    // 3️⃣ Paiement de l’achat
    public String payerAchat(Long idAchat) {
        Achat achat = achatRepository.findById(idAchat)
                .orElseThrow(() -> new RuntimeException("Achat non trouvé !"));

        return "Achat payé avec succès ! Montant: " + achat.getPrixTotal();
    }

    // 4️⃣ Historique des achats d'un client
    public List<Achat> historiqueAchats(Long clientId) {
        return achatRepository.findByClientId(clientId);
    }

    // Simuler une récupération de prix produit
    private double getPrixProduit(Long produitId) {
        return 10.0; // Simulé
    }
}
