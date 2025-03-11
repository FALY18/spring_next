package com.javaweb.javaweb.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Achat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long clientId;

    @Column(nullable = false)
    private Double prixTotal;

    @Column(nullable = false)
    private String modePaiement;

    @Column(nullable = false)
    private LocalDateTime dateAchat;

    @OneToMany(mappedBy = "achat", cascade = CascadeType.ALL)
    private List<Panier> paniers;

    // Constructeur sans argument
    public Achat() {
        this.dateAchat = LocalDateTime.now();
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getClientId() { return clientId; }
    public void setClientId(Long clientId) { this.clientId = clientId; }

    public Double getPrixTotal() { return prixTotal; }
    public void setPrixTotal(Double prixTotal) { this.prixTotal = prixTotal; }

    public String getModePaiement() { return modePaiement; }
    public void setModePaiement(String modePaiement) { this.modePaiement = modePaiement; }

    public LocalDateTime getDateAchat() { return dateAchat; }
    public void setDateAchat(LocalDateTime dateAchat) { this.dateAchat = dateAchat; }

    public List<Panier> getPaniers() { return paniers; }
    public void setPaniers(List<Panier> paniers) { this.paniers = paniers; }
}

