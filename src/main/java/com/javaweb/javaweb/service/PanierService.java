//package com.javaweb.javaweb.service;
//
//import com.javaweb.javaweb.model.Panier;
//import com.javaweb.javaweb.repository.PanierRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class PanierService {
//
//    @Autowired
//    private PanierRepository panierRepository;
//
//    public Panier ajouterProduit(Panier panier) {
//        return panierRepository.save(panier);
//    }
//
//    public List<Panier> recupererPanierParClient(Long clientId) {
//        return panierRepository.findByClientId(clientId);
//    }
//
//    public boolean supprimerProduit(Long id) {
//        Optional<Panier> panier = panierRepository.findById(id);
//        if (panier.isPresent()) {
//            panierRepository.deleteById(id);
//            return true;
//        }
//        return false;
//    }
//}
