package com.javaweb.javaweb.repository;

import com.javaweb.javaweb.model.Achat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchatRepository extends JpaRepository<Achat, Long> {
    List<Achat> findByClientId(Long clientId);
}
