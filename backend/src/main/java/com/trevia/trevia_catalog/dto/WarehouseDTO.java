package com.trevia.trevia_catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseDTO {
    private Long id;
    private String name;
    private String location;
    private String address;
    private Integer capacity;
    private String manager;
    private boolean active;
}
