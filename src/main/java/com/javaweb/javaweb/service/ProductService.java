
package com.javaweb.javaweb.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import com.javaweb.javaweb.model.Product;
import com.javaweb.javaweb.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getRecentProducts() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minus(30, ChronoUnit.DAYS);
        return productRepository.findRecentProducts(oneMonthAgo);
    }

    public List<Product> getTopSellingProducts() {
        return productRepository.findByOrderByNombreVentesDesc();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        existingProduct.setNom(product.getNom());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrix(product.getPrix());
        existingProduct.setQuantiteStock(product.getQuantiteStock());
        existingProduct.setImageUrl(product.getImageUrl());
        existingProduct.setCategories(product.getCategories());

        return productRepository.save(existingProduct);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Map<String,Object>> getStatsToutesCategories() {
        List<Object[]> rows = productRepository.sumVentesGroupByCategorieRaw();
        List<Map<String,Object>> stats = new ArrayList<>();
        for (Object[] row : rows) {
            stats.add(Map.of(
                    "categorie", row[0].toString(),
                    "total", ((Number)row[1]).intValue()
            ));
        }
        return stats;
    }


}
