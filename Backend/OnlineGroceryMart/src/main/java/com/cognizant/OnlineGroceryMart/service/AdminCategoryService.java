package com.cognizant.OnlineGroceryMart.service;

import java.util.List;

import com.cognizant.OnlineGroceryMart.entity.Category;

public interface AdminCategoryService {

	List<Category> getAllCategories();
	Category getCategory(Long id);
	Category createCategory(Category category);
	Category updateCategory(Long id,Category category);
	String deleteCategory(Long id);
	
}
