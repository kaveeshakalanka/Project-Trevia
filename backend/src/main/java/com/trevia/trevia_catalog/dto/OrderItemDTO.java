package com.trevia.trevia_catalog.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {

    private Long id;
    private Long productId;
    private String productName; // Helper for display
    private String productImageUrl; // Helper for display

    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
    private String selectedSize;
}
