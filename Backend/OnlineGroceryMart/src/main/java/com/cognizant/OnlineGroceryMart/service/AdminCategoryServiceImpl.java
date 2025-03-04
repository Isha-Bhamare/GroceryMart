package com.cognizant.OnlineGroceryMart.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.OnlineGroceryMart.entity.Category;
import com.cognizant.OnlineGroceryMart.exception.CategoryNotFoundException;
import com.cognizant.OnlineGroceryMart.repository.CategoryRepository;

@Service
public class AdminCategoryServiceImpl implements AdminCategoryService{

	Logger logger = LoggerFactory.getLogger(AdminCategoryServiceImpl.class);

	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public Category getCategory(Long id) {
		Category category = categoryRepository.findById(id)
			.orElseThrow(() -> new CategoryNotFoundException("Category Not Found of Id : " + id));
		
		logger.info("getCategory service");
		
		return category;
	}

	@Override
	public List<Category> getAllCategories() {
		logger.info("getAllCategories service");
		return categoryRepository.findAll();
	}

	@Override
	public Category createCategory(Category category) {
		logger.info("createCategory service");
		return categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Long id, Category category) {
		Category existingCategory = getCategory(id);
        existingCategory.setName(category.getName());
        logger.info("updateCategory service");
        return categoryRepository.save(existingCategory);
	}

	@Override
	public String deleteCategory(Long id) {
		Category category = getCategory(id);
		categoryRepository.delete(category);
		logger.info("deleteCategory service");
		return String.format("Category %s is Deleted", id);
	}

}
