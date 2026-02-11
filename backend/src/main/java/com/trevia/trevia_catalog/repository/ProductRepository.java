package com.trevia.trevia_catalog.repository;

import com.trevia.trevia_catalog.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryIdOrCategoryParentId(Long categoryId, Long parentId, Pageable pageable);
    Page<Product> findByCategoryIdAndDeletedFalseOrCategoryParentIdAndDeletedFalse(Long categoryId, Long parentId, Pageable pageable);
    // Find by Category Name or Parent Name (non-deleted)
    Page<Product> findByCategoryNameOrCategoryParentNameAndDeletedFalse(String categoryName, String parentName, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCaseAndDeletedFalse(String name, Pageable pageable);
    
    // Find all not deleted
    Page<Product> findByDeletedFalse(Pageable pageable);
}
