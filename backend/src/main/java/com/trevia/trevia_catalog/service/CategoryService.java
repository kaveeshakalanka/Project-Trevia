package com.trevia.trevia_catalog.service;

import com.trevia.trevia_catalog.dto.CategoryDTO;
import com.trevia.trevia_catalog.entity.Category;
import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    Category createCategory(Category category);
}

