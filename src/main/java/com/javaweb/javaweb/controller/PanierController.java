package com.javaweb.javaweb.controller;

import com.javaweb.javaweb.model.Panier;
import com.javaweb.javaweb.service.PanierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/panier")
public class PanierController {

    private final PanierService panierService;

    public PanierController(PanierService panierService) {
        this.panierService = panierService;
    }

    // 🛒 Endpoint pour récupérer le panier d'un client
    @GetMapping("/{clientId}")
    public List<Panier> getPanierByClientId(@PathVariable Long clientId) {
        return panierService.getPanierByClientId(clientId);
    }
}
