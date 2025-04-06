package com.javaweb.javaweb.service;

import com.javaweb.javaweb.model.Panier;
import com.javaweb.javaweb.repository.PanierRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PanierService {

    private final PanierRepository panierRepository;

    public PanierService(PanierRepository panierRepository) {
        this.panierRepository = panierRepository;
    }

    // 🛒 3️⃣ Récupérer le panier d'un client (produits non encore achetés)
    public List<Panier> getPanierByClientId(Long clientId) {
        return panierRepository.findByClientIdAndAchatIsNull(clientId);
    }
}
