package com.trevia.trevia_catalog.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    private String name;

    @Column(length = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be non-negative")
    private BigDecimal price;

    @Min(value = 0, message = "Stock must be non-negative")
    private Integer stock;
    
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"subCategories", "parent", "products", "hibernateLazyInitializer", "handler"})
    private Category category;
    
    private String sizes; // e.g. "S,M,L"
    
    @Column(unique = true)
    private String sku; // Stock Keeping Unit
    
    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Warehouse warehouse;
    
    @Min(value = 0, message = "Reorder level must be non-negative")
    private Integer reorderLevel; // Alert when stock falls below this level
    
    // Soft delete field
    @Column(name = "is_deleted")
    private boolean deleted = false;
}
