package com.javaweb.javaweb.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "produits")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private double prix;
    private int quantiteStock;
    private String imageUrl;
    private String categories;

    @Column(name = "nombre_ventes") // Correction ici
    private int nombreVentes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructeurs
    public Product() {}

    public Product(String nom, String description, double prix, int quantiteStock, String imageUrl, String categories, int nombreVentes) {
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.quantiteStock = quantiteStock;
        this.imageUrl = imageUrl;
        this.categories = categories;
        this.nombreVentes = nombreVentes;
        this.createdAt = LocalDateTime.now(); // Initialise createdAt à la date actuelle
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrix() { return prix; }
    public void setPrix(double prix) { this.prix = prix; }

    public int getQuantiteStock() { return quantiteStock; }
    public void setQuantiteStock(int quantiteStock) { this.quantiteStock = quantiteStock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCategories() { return categories; }
    public void setCategories(String categories) { this.categories = categories; }

    public int getNombreVentes() { return nombreVentes; }
    public void setNombreVentes(int nombreVentes) { this.nombreVentes = nombreVentes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
