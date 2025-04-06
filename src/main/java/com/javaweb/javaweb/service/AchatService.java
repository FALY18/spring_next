package com.javaweb.javaweb.service;

import com.javaweb.javaweb.model.Achat;
import com.javaweb.javaweb.model.Panier;
import com.javaweb.javaweb.model.Product;
import com.javaweb.javaweb.repository.ProductRepository;
import org.springframework.transaction.annotation.Transactional;
import com.javaweb.javaweb.repository.AchatRepository;
import com.javaweb.javaweb.repository.PanierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchatService {
    private final AchatRepository achatRepository;
    private final PanierRepository panierRepository;
    private final ProductRepository productRepository;

    public AchatService(AchatRepository achatRepository, PanierRepository panierRepository, ProductRepository productRepository) {
        this.achatRepository = achatRepository;
        this.panierRepository = panierRepository;
        this.productRepository = productRepository;
    }

    // 1️⃣ Ajouter un produit au panier (avec vérification du stock)
    public Panier ajouterAuPanier(Panier panier) {
        Product produit = productRepository.findById(panier.getProduitId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé !"));

        if (produit.getQuantiteStock() < panier.getQuantite()) {
            throw new IllegalStateException("Stock insuffisant pour le produit : " + produit.getNom());
        }

        return panierRepository.save(panier);
    }

    @Transactional
    public Achat validerPanier(Long clientId, String modePaiement) {
        List<Panier> paniers = panierRepository.findByAchatIsNull();

        if (paniers.isEmpty()) {
            throw new IllegalStateException("Le panier est vide !");
        }

        double prixTotal = 0.0;

        // **1ère boucle : Vérification du stock (sans modification)**
        for (Panier panier : paniers) {
            Product produit = productRepository.findById(panier.getProduitId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé !"));

            if (produit.getQuantiteStock() < panier.getQuantite()) {
                throw new IllegalStateException("Stock insuffisant pour le produit : " + produit.getNom());
            }
        }

        // **2ème boucle : Mise à jour du stock, nombre de ventes et calcul du prix total**
        for (Panier panier : paniers) {
            Product produit = productRepository.findById(panier.getProduitId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé !"));

            // ✅ Met à jour le stock
            produit.setQuantiteStock(produit.getQuantiteStock() - panier.getQuantite());

            // ✅ Incrémente le nombre de ventes
            produit.setNombreVentes(produit.getNombreVentes() + panier.getQuantite());

            productRepository.save(produit);

            prixTotal += panier.getQuantite() * produit.getPrix();
        }

        // Création de l'achat
        Achat achat = new Achat();
        achat.setClientId(clientId);
        achat.setPrixTotal(prixTotal);
        achat.setModePaiement(modePaiement);

        Achat savedAchat = achatRepository.save(achat);

        // Associer les paniers à l'achat
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
}
