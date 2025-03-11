//package com.javaweb.javaweb.controller;
//
//import com.javaweb.javaweb.model.Panier;
//import com.javaweb.javaweb.service.PanierService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/panier")
//public class PanierController {
//
//    @Autowired
//    private PanierService panierService;
//
//    @PostMapping("/ajouter")
//    public ResponseEntity<String> ajouterAuPanier(@RequestBody Panier panier) {
//        panierService.ajouterProduit(panier);
//        return ResponseEntity.ok("{\"message\": \"Produit ajouté au panier !\"}");
//    }
//
//    @GetMapping("/{clientId}")
//    public ResponseEntity<List<Panier>> recupererPanier(@PathVariable Long clientId) {
//        List<Panier> panier = panierService.recupererPanierParClient(clientId);
//        return ResponseEntity.ok(panier);
//    }
//
//    @DeleteMapping("/supprimer/{id}")
//    public ResponseEntity<String> supprimerDuPanier(@PathVariable Long id) {
//        boolean isDeleted = panierService.supprimerProduit(id);
//        if (isDeleted) {
//            return ResponseEntity.ok("{\"message\": \"Produit supprimé du panier !\"}");
//        }
//        return ResponseEntity.status(404).body("{\"message\": \"Produit non trouvé !\"}");
//    }
//}
