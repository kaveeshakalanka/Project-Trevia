package com.trevia.trevia_catalog.service.impl;

import com.trevia.trevia_catalog.dto.CategoryDTO;
import com.trevia.trevia_catalog.entity.Category;
import java.util.stream.Collectors;
import com.trevia.trevia_catalog.repository.CategoryRepository;
import com.trevia.trevia_catalog.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        // Use MapperUtil or manual mapping
        return categories.stream().map(c -> {
             CategoryDTO dto = new CategoryDTO();
             dto.setId(c.getId());
             dto.setName(c.getName());
             dto.setDescription(c.getDescription());
             if (c.getParent() != null) {
                 dto.setParentId(c.getParent().getId());
                 dto.setParentName(c.getParent().getName());
             }
             return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
}
