package com.javaweb.javaweb.repository;

import com.javaweb.javaweb.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PanierRepository extends JpaRepository<Panier, Long> {
    List<Panier> findByAchatIsNull();
}
