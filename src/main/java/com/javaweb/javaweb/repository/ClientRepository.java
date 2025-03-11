package com.javaweb.javaweb.repository;

import com.javaweb.javaweb.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByEmail(String email);
}

