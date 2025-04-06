package com.javaweb.javaweb.repository;

import com.javaweb.javaweb.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOrderByCreatedAtDesc(); // Récupérer les produits les plus récents

    List<Product> findByOrderByNombreVentesDesc(); // Récupérer les produits les plus achetés

    @Query("SELECT p FROM Product p WHERE p.createdAt >= :recentDate ORDER BY p.createdAt DESC")
    List<Product> findRecentProducts(@Param("recentDate") LocalDateTime recentDate);

    @Query("SELECT p FROM Product p WHERE p.categories LIKE %:category%")
    List<Product> findByCategory(@Param("category") String category);

    @Query(value = """
    SELECT categories, COALESCE(SUM(nombre_ventes),0)
    FROM produits
    GROUP BY categories
    """, nativeQuery = true)
    List<Object[]> sumVentesGroupByCategorieRaw();


}

