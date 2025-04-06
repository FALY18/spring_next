package com.javaweb.javaweb.controller;

import com.javaweb.javaweb.model.Product;
import com.javaweb.javaweb.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:3000") // Permettre l'accès depuis le frontend Next.js
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Produit supprimé avec succès !");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("/recent")
    public List<Product> getRecentProducts() {
        return productService.getRecentProducts();
    }

    @GetMapping("/top-selling")
    public List<Product> getTopSellingProducts() {
        return productService.getTopSellingProducts();
    }
    @GetMapping("/categories/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }


    @GetMapping("/statistiques/toutes")
    public ResponseEntity<List<Map<String,Object>>> getStatsToutesCategories() {
        return ResponseEntity.ok(productService.getStatsToutesCategories());
    }

}
