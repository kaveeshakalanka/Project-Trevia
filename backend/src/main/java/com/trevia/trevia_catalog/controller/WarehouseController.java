package com.trevia.trevia_catalog.controller;package com.trevia.trevia_catalog.controller;

import com.trevia.trevia_catalog.dto.WarehouseDTO;
import com.trevia.trevia_catalog.entity.Warehouse;
import com.trevia.trevia_catalog.service.WarehouseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/warehouses")
@RequiredArgsConstructor
public class WarehouseController {

    private final WarehouseService warehouseService;

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        return ResponseEntity.ok(warehouseService.getAllWarehouses());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/active")
    public ResponseEntity<List<Warehouse>> getActiveWarehouses() {
        return ResponseEntity.ok(warehouseService.getActiveWarehouses());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> getWarehouseById(@PathVariable Long id) {
        return warehouseService.getWarehouseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody WarehouseDTO warehouseDTO) {
        return ResponseEntity.ok(warehouseService.createWarehouse(warehouseDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Warehouse> updateWarehouse(@PathVariable Long id, 
                                                     @Valid @RequestBody WarehouseDTO warehouseDTO) {
        return ResponseEntity.ok(warehouseService.updateWarehouse(id, warehouseDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Long id) {
        warehouseService.deleteWarehouse(id);
        return ResponseEntity.ok().build();
    }
}
