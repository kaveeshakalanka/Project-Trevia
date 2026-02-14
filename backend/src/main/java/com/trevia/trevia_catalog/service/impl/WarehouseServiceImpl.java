package com.trevia.trevia_catalog.service.impl;

import com.trevia.trevia_catalog.dto.WarehouseDTO;
import com.trevia.trevia_catalog.entity.Warehouse;
import com.trevia.trevia_catalog.exception.BadRequestException;
import com.trevia.trevia_catalog.exception.ResourceNotFoundException;
import com.trevia.trevia_catalog.repository.WarehouseRepository;
import com.trevia.trevia_catalog.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Override
    @Transactional
    public Warehouse createWarehouse(WarehouseDTO warehouseDTO) {
        if (warehouseRepository.existsByName(warehouseDTO.getName())) {
            throw new BadRequestException("Warehouse with name '" + warehouseDTO.getName() + "' already exists");
        }

        Warehouse warehouse = Warehouse.builder()
                .name(warehouseDTO.getName())
                .location(warehouseDTO.getLocation())
                .address(warehouseDTO.getAddress())
                .capacity(warehouseDTO.getCapacity())
                .manager(warehouseDTO.getManager())
                .active(true)
                .build();

        return warehouseRepository.save(warehouse);
    }

    @Override
    @Transactional
    public Warehouse updateWarehouse(Long id, WarehouseDTO warehouseDTO) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));

        warehouse.setName(warehouseDTO.getName());
        warehouse.setLocation(warehouseDTO.getLocation());
        warehouse.setAddress(warehouseDTO.getAddress());
        warehouse.setCapacity(warehouseDTO.getCapacity());
        warehouse.setManager(warehouseDTO.getManager());
        warehouse.setActive(warehouseDTO.isActive());

        return warehouseRepository.save(warehouse);
    }

    @Override
    @Transactional
    public void deleteWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id: " + id));
        
        // Soft delete by marking as inactive
        warehouse.setActive(false);
        warehouseRepository.save(warehouse);
    }

    @Override
    public Optional<Warehouse> getWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }

    @Override
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @Override
    public List<Warehouse> getActiveWarehouses() {
        return warehouseRepository.findByActiveTrue();
    }
}
