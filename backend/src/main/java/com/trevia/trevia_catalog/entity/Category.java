package com.trevia.trevia_catalog.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "categories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Category name is required")
    @Column(nullable = false, unique = false) // Names not unique globally anymore (e.g. Men->Tops, Women->Tops)
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_id")
    private Category parent;

    // JSON Ignore to prevent recursion if not handling DTOs carefully,
    // but we use ModelMapper usually. Let's rely on DTOs.
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Category> subCategories;

    // Optional: bidirectional relationship
    // @OneToMany(mappedBy = "category")
    // private List<Product> products;
}
