package com.javaweb.javaweb.model;


import jakarta.persistence.*;

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

    // Constructeurs
    public Product() {}

    public Product(String nom, String description, double prix, int quantiteStock, String imageUrl,String categories) {
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.quantiteStock = quantiteStock;
        this.imageUrl = imageUrl;
        this.categories = categories;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public double getPrix() { return prix; }
    public int getQuantiteStock() { return quantiteStock; }
    public String getImageUrl() { return imageUrl; }
    public String getCategories() {
        return categories;
    }

    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setPrix(double prix) { this.prix = prix; }
    public void setQuantiteStock(int quantiteStock) { this.quantiteStock = quantiteStock; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setCategories(String categories) {
        this.categories = categories;
    }
}
