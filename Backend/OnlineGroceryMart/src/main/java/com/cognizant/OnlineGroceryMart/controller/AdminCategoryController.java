package com.cognizant.OnlineGroceryMart.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.OnlineGroceryMart.entity.Category;
import com.cognizant.OnlineGroceryMart.service.AdminCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/category")
@CrossOrigin
public class AdminCategoryController {

	Logger logger = LoggerFactory.getLogger(AdminCategoryController.class);	
	
	@Autowired
	private AdminCategoryService categoryService;
	
	
	@GetMapping(path = "/allcategories")
	public List<Category> getAllCategories(){
		logger.info("Display All Categories");
		return categoryService.getAllCategories();
	}
	
	
	@GetMapping(path = "/{id}")
	public Category getCategory(@PathVariable Long id) {
		logger.info("Display Category by ID "+ id);
		return categoryService.getCategory(id);
	}
	
	
	@PostMapping(path = "/create")
	public Category createCategory(@Valid @RequestBody Category category) {
		logger.info("Category created: "+ category);
//		System.out.println(category);
		return categoryService.createCategory(category);
	}
	
	
	@PutMapping(path = "/update/{id}")
	public Category updateCategory(@PathVariable Long id,@RequestBody Category category) {
		logger.info("Category id: "+ id + "updated, category: "+category);
		return categoryService.updateCategory(id, category);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public String deleteCategory(@PathVariable Long id) {
		logger.info("Delete Category id: "+ id);
		return categoryService.deleteCategory(id);
	}
	

}
