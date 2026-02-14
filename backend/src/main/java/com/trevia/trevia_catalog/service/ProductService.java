package com.trevia.trevia_catalog.service;

import com.trevia.trevia_catalog.dto.ProductDTO;
import com.trevia.trevia_catalog.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;

public interface ProductService {
    Page<Product> getAllProducts(Pageable pageable);

    Page<Product> searchProducts(String keyword, Pageable pageable);

    Page<Product> getProductsByCategory(String categoryName, Pageable pageable);

    Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable);

    Optional<Product> getProductById(Long id);

    Product createProduct(ProductDTO productDTO) throws IOException;

    Product updateProduct(Long id, ProductDTO productDTO) throws IOException;

    void deleteProduct(Long id);
}
