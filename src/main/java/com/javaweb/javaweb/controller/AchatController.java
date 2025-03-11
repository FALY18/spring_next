package com.javaweb.javaweb.controller;

import com.javaweb.javaweb.model.Achat;
import com.javaweb.javaweb.model.Panier;
import com.javaweb.javaweb.service.AchatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achat")
@CrossOrigin(origins = "*")
public class AchatController {
    private final AchatService achatService;

    public AchatController(AchatService achatService) {
        this.achatService = achatService;
    }

    @PostMapping("/panier")
    public Panier ajouterAuPanier(@RequestBody Panier panier) {
        return achatService.ajouterAuPanier(panier);
    }


    @PostMapping("/valider")
    public Achat validerPanier(@RequestBody Achat achat) {
        return achatService.validerPanier(achat.getClientId(), achat.getModePaiement());
    }


    @PostMapping("/payer/{idAchat}")
    public String payerAchat(@PathVariable Long idAchat) {
        return achatService.payerAchat(idAchat);
    }

    @GetMapping("/historique/{clientId}")
    public List<Achat> historiqueAchats(@PathVariable Long clientId) {
        return achatService.historiqueAchats(clientId);
    }
}
