package com.trevia.trevia_catalog.service;

import java.time.LocalDateTime;
import java.util.List;

import com.trevia.trevia_catalog.dto.InventoryTransactionDTO;
import com.trevia.trevia_catalog.entity.InventoryTransaction;
import com.trevia.trevia_catalog.entity.User;

public interface InventoryService {
    InventoryTransaction recordTransaction(InventoryTransactionDTO transactionDTO, User performedBy);

    List<InventoryTransaction> getProductTransactions(Long productId);

    List<InventoryTransaction> getWarehouseTransactions(Long warehouseId);

    List<InventoryTransaction> getTransactionsByDateRange(LocalDateTime startDate, LocalDateTime endDate);

    List<InventoryTransaction> getProductWarehouseTransactions(Long productId, Long warehouseId);

    Integer getCurrentStock(Long productId, Long warehouseId);

    List<InventoryTransaction> getAllTransactions();

    List<Object[]> getLowStockProducts(); // Products below reorder level
}
