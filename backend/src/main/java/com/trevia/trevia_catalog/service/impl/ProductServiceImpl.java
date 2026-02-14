package com.trevia.trevia_catalog.service.impl;

import com.trevia.trevia_catalog.dto.ProductDTO;
import com.trevia.trevia_catalog.entity.Category;
import com.trevia.trevia_catalog.entity.Product;
import com.trevia.trevia_catalog.repository.CategoryRepository;
import com.trevia.trevia_catalog.repository.ProductRepository;
import com.trevia.trevia_catalog.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // Quick and dirty upload path. In prod, use properties.
    private final Path rootLocation = Paths.get("uploads");

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findByDeletedFalse(pageable);
    }

    @Override
    public Page<Product> searchProducts(String keyword, Pageable pageable) {
        if (keyword == null || keyword.isEmpty())
            return getAllProducts(pageable);
        return productRepository.findByNameContainingIgnoreCaseAndDeletedFalse(keyword, pageable);
    }

    @Override
    public Page<Product> getProductsByCategory(String categoryName, Pageable pageable) {
        if (categoryName != null && !categoryName.isEmpty()) {
            return productRepository.findByCategoryNameOrCategoryParentNameAndDeletedFalse(categoryName, categoryName,
                    pageable);
        }
        // If categoryName is null or empty, return all non-deleted products
        return productRepository.findByDeletedFalse(pageable);
    }

    @Override
    public Page<Product> getProductsByCategoryId(Long categoryId, Pageable pageable) {
        if (categoryId != null) {
            return productRepository.findByCategoryIdAndDeletedFalseOrCategoryParentIdAndDeletedFalse(categoryId,
                    categoryId, pageable);
        }
        return productRepository.findByDeletedFalse(pageable);
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(ProductDTO productDTO) throws IOException {
        String imageUrl = storeFile(productDTO.getImage());

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .price(productDTO.getPrice())
                .stock(productDTO.getStock())
                .category(category)
                .imageUrl(imageUrl)
                .sizes(productDTO.getSizes())
                .deleted(false)
                .build();

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, ProductDTO productDTO) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());

        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        product.setSizes(productDTO.getSizes());

        if (productDTO.getImage() != null && !productDTO.getImage().isEmpty()) {
            String imageUrl = storeFile(productDTO.getImage());
            product.setImageUrl(imageUrl);
        }

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setDeleted(true);
        productRepository.save(product);
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty())
            return null;

        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }

        String filename = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, rootLocation.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        }
        return filename;
    }
}
