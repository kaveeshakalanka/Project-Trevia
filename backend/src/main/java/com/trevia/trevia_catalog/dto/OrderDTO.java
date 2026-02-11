package com.trevia.trevia_catalog.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long id;
    private String orderNumber;
    private Long userId; // Representing the user by ID
    private String username; // Optional: helper field for display

    @Builder.Default
    private List<OrderItemDTO> orderItems = new ArrayList<>();

    private java.math.BigDecimal totalAmount;
    private String status;

    private String shippingAddress;
    private String shippingCity;
    private String shippingPostalCode;
    private String shippingCountry;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
