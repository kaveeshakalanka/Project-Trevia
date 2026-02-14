package com.trevia.trevia_catalog.service;

import com.trevia.trevia_catalog.dto.WarehouseDTO;
import com.trevia.trevia_catalog.entity.Warehouse;

import java.util.List;
import java.util.Optional;

public interface WarehouseService {
    Warehouse createWarehouse(WarehouseDTO warehouseDTO);
    Warehouse updateWarehouse(Long id, WarehouseDTO warehouseDTO);
    void deleteWarehouse(Long id);
    Optional<Warehouse> getWarehouseById(Long id);
    List<Warehouse> getAllWarehouses();
    List<Warehouse> getActiveWarehouses();
}
