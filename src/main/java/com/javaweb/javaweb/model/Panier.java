package com.javaweb.javaweb.model;

import jakarta.persistence.*;

@Entity
public class Panier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id") // Ajoute la clé étrangère vers Client
    private Client client;

    @ManyToOne
    @JoinColumn(name = "achat_id") // Ajoute la clé étrangère vers Achat
    private Achat achat;

    @Column(nullable = false)
    private Long produitId;

    @Column(nullable = false)
    private Integer quantite;

    // Constructeur sans argument
    public Panier() {}

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }

    public Achat getAchat() { return achat; }
    public void setAchat(Achat achat) { this.achat = achat; }

    public Long getProduitId() { return produitId; }
    public void setProduitId(Long produitId) { this.produitId = produitId; }

    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
}
