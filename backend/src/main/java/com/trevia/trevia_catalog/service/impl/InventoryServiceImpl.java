package com.trevia.trevia_catalog.service.impl;

import com.trevia.trevia_catalog.dto.InventoryTransactionDTO;
import com.trevia.trevia_catalog.entity.InventoryTransaction;
import com.trevia.trevia_catalog.entity.Product;
import com.trevia.trevia_catalog.entity.User;
import com.trevia.trevia_catalog.entity.Warehouse;
import com.trevia.trevia_catalog.exception.ResourceNotFoundException;
import com.trevia.trevia_catalog.repository.InventoryTransactionRepository;
import com.trevia.trevia_catalog.repository.ProductRepository;
import com.trevia.trevia_catalog.repository.WarehouseRepository;
import com.trevia.trevia_catalog.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryTransactionRepository inventoryTransactionRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public InventoryTransaction recordTransaction(InventoryTransactionDTO transactionDTO, User performedBy) {
        if (transactionDTO.getProductId() == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }
        if (transactionDTO.getWarehouseId() == null) {
            throw new IllegalArgumentException("Warehouse ID cannot be null");
        }

        Product product = productRepository.findById(transactionDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + transactionDTO.getProductId()));

        Warehouse warehouse = warehouseRepository.findById(transactionDTO.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Warehouse not found with id: " + transactionDTO.getWarehouseId()));

        InventoryTransaction transaction = InventoryTransaction.builder()
                .product(product)
                .warehouse(warehouse)
                .quantity(transactionDTO.getQuantity())
                .transactionType(transactionDTO.getTransactionType())
                .performedBy(performedBy)
                .notes(transactionDTO.getNotes())
                .build();

        // Update product stock based on transaction type
        updateProductStock(product, transactionDTO.getQuantity(), transactionDTO.getTransactionType());

        return inventoryTransactionRepository.save(transaction);
    }

    private void updateProductStock(Product product, Integer quantity, InventoryTransaction.TransactionType type) {
        int currentStock = product.getStock() != null ? product.getStock() : 0;

        switch (type) {
            case IN:
            case RETURN:
                product.setStock(currentStock + quantity);
                break;
            case OUT:
                product.setStock(Math.max(0, currentStock - quantity));
                break;
            case ADJUSTMENT:
                product.setStock(quantity);  
                break;
            case TRANSFER:
              
                break;
        }

        productRepository.save(product);
    }

    @Override
    public List<InventoryTransaction> getProductTransactions(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        return inventoryTransactionRepository.findByProductOrderByTransactionDateDesc(product);
    }

    @Override
    public List<InventoryTransaction> getWarehouseTransactions(Long warehouseId) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + warehouseId));
        return inventoryTransactionRepository.findByWarehouseOrderByTransactionDateDesc(warehouse);
    }

    @Override
    public List<InventoryTransaction> getTransactionsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return inventoryTransactionRepository.findByTransactionDateBetweenOrderByTransactionDateDesc(startDate,
                endDate);
    }

    @Override
    public List<InventoryTransaction> getProductWarehouseTransactions(Long productId, Long warehouseId) {
        return inventoryTransactionRepository.findByProductAndWarehouse(productId, warehouseId);
    }

    @Override
    public Integer getCurrentStock(Long productId, Long warehouseId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        return product.getStock() != null ? product.getStock() : 0;
    }

    @Override
    public List<InventoryTransaction> getAllTransactions() {
        return inventoryTransactionRepository.findAll(Sort.by(Sort.Direction.DESC, "transactionDate"));
    }

    @Override
    public List<Object[]> getLowStockProducts() {
        String query = "SELECT p.id, p.name, p.stock, p.reorderLevel, w.name " +
                "FROM Product p LEFT JOIN p.warehouse w " +
                "WHERE p.deleted = false AND p.reorderLevel IS NOT NULL " +
                "AND p.stock <= p.reorderLevel " +
                "ORDER BY p.stock ASC";
        return entityManager.createQuery(query, Object[].class).getResultList();
    }
}
