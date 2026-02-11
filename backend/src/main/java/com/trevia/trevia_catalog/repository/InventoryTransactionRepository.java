package com.trevia.trevia_catalog.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.trevia.trevia_catalog.entity.InventoryTransaction;
import com.trevia.trevia_catalog.entity.Product;
import com.trevia.trevia_catalog.entity.Warehouse;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    
    List<InventoryTransaction> findByProductOrderByTransactionDateDesc(Product product);
    
    List<InventoryTransaction> findByWarehouseOrderByTransactionDateDesc(Warehouse warehouse);
    
    List<InventoryTransaction> findByTransactionDateBetweenOrderByTransactionDateDesc(
            LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT it FROM InventoryTransaction it WHERE it.product.id = :productId AND it.warehouse.id = :warehouseId ORDER BY it.transactionDate DESC")
    List<InventoryTransaction> findByProductAndWarehouse(
            @Param("productId") Long productId, 
            @Param("warehouseId") Long warehouseId);
}
