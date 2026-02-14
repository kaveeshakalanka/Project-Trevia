package com.trevia.trevia_catalog.controller;

import com.trevia.trevia_catalog.dto.InventoryTransactionDTO;
import com.trevia.trevia_catalog.entity.InventoryTransaction;
import com.trevia.trevia_catalog.entity.User;
import com.trevia.trevia_catalog.repository.UserRepository;
import com.trevia.trevia_catalog.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;
    private final UserRepository userRepository;

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @PostMapping("/transactions")
    public ResponseEntity<InventoryTransaction> recordTransaction(
            @Valid @RequestBody InventoryTransactionDTO transactionDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(inventoryService.recordTransaction(transactionDTO, user));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/transactions/product/{productId}")
    public ResponseEntity<List<InventoryTransaction>> getProductTransactions(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getProductTransactions(productId));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/transactions/warehouse/{warehouseId}")
    public ResponseEntity<List<InventoryTransaction>> getWarehouseTransactions(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(inventoryService.getWarehouseTransactions(warehouseId));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/transactions/date-range")
    public ResponseEntity<List<InventoryTransaction>> getTransactionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(inventoryService.getTransactionsByDateRange(startDate, endDate));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/stock/{productId}/{warehouseId}")
    public ResponseEntity<Map<String, Integer>> getCurrentStock(
            @PathVariable Long productId,
            @PathVariable Long warehouseId) {
        Integer stock = inventoryService.getCurrentStock(productId, warehouseId);
        Map<String, Integer> response = new HashMap<>();
        response.put("stock", stock);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/low-stock")
    public ResponseEntity<List<Object[]>> getLowStockProducts() {
        return ResponseEntity.ok(inventoryService.getLowStockProducts());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/transactions")
    public ResponseEntity<List<InventoryTransaction>> getAllTransactions() {
        return ResponseEntity.ok(inventoryService.getAllTransactions());
    }
}
