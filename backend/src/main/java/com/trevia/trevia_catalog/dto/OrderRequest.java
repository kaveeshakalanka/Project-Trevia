package com.trevia.trevia_catalog.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class OrderRequest {
    @NotEmpty
    private List<OrderItemRequest> items;
//COD(cash on delevery and card pay)
    private String paymentMethod; 

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
    }
}
