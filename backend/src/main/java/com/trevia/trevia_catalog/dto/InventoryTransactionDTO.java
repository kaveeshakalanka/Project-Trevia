package com.trevia.trevia_catalog.dto;

import com.trevia.trevia_catalog.entity.InventoryTransaction;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryTransactionDTO {
    private Long id;

    @NotNull(message = "Product ID is required")
    private Long productId;
    
    private String productName;

    @NotNull(message = "Warehouse ID is required")
    private Long warehouseId;
    
    private String warehouseName;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Transaction Type is required")
    private InventoryTransaction.TransactionType transactionType;
    
    private String performedByUsername;
    private String notes;
    private LocalDateTime transactionDate;
}
