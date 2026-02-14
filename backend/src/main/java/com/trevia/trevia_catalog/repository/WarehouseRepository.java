package com.trevia.trevia_catalog.repository;

import com.trevia.trevia_catalog.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    List<Warehouse> findByActiveTrue();
    boolean existsByName(String name);
}
