package com.cognizant.OnlineGroceryMart.service;

import java.util.List;

import com.cognizant.OnlineGroceryMart.entity.Product;
import com.cognizant.OnlineGroceryMart.request.ProductRequest;

public interface AdminProductService {

	Product getProduct(Long id);
	
	List<Product> getAllProducts();
	
	List<Product> getProductsByCategoryId(Long categoryId);
	
	Product createProduct(ProductRequest product);
	
	Product updateProduct(Long id,ProductRequest product);
	
	String deleteProduct(Long id);
	
}
