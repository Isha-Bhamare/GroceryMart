package com.cognizant.OnlineGroceryMart;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.cognizant.OnlineGroceryMart.controller.AdminCategoryController;
import com.cognizant.OnlineGroceryMart.entity.Category;
import com.cognizant.OnlineGroceryMart.service.AdminCategoryService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AdminCategoryControllerTest {
	
	@Mock
	private AdminCategoryService categoryService;
	
	@InjectMocks
	private AdminCategoryController categoryController;
	
	@Test
	public void testGetAllCategories() {
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Category category2 = Category.builder()
				.id(1L)
				.name("Dairy, Bread and Eggs")
				.build();
		
		List<Category> expectedCategories = Arrays.asList(category1,category2);
		
		when(categoryService.getAllCategories()).thenReturn(expectedCategories);
		
		List<Category> responseCategories = categoryController.getAllCategories();
		
		assertEquals(expectedCategories, responseCategories);
		
	}
	
	@Test
	public void testGetCategory() {
		Long categoryId = 1L;
		Category expectedCategory = Category.builder()
				.id(categoryId)
				.name("Namkeen and Snacks")
				.build();
		
		when(categoryService.getCategory(categoryId)).thenReturn(expectedCategory);
		
		Category responseCategory = categoryController.getCategory(categoryId);
		
		assertEquals(expectedCategory, responseCategory);
	}
	
	@Test
	public void testCreateCategory() {
		Long categoryId = 1L;
		
		Category category = Category.builder()
				.name("Namkeen and Snacks")
				.build();
		
		Category CreatedCategory = Category.builder()
				.id(categoryId)
				.name("Namkeen and Snacks")
				.build();
		
		when(categoryService.createCategory(category)).thenReturn(CreatedCategory);
		
		Category responseCategory = categoryController.createCategory(category);
		
		assertEquals(CreatedCategory, responseCategory);
	}
	
	@Test
	public void testDeleteCategory() {
	    Long categoryId = 1L;

	    when(categoryService.deleteCategory(categoryId)).thenReturn("Category is Deleted");

	    String responseCategory = categoryController.deleteCategory(categoryId);

	    assertEquals("Category is Deleted", responseCategory);

	    verify(categoryService).deleteCategory(categoryId);
	}

}
