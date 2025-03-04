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

import com.cognizant.OnlineGroceryMart.entity.Product;
import com.cognizant.OnlineGroceryMart.request.ProductRequest;
import com.cognizant.OnlineGroceryMart.service.AdminProductService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping(path="/api/v1/product")
public class AdminProductController {
	
	Logger logger = LoggerFactory.getLogger(AdminProductController.class);

	@Autowired
	private AdminProductService productService;
	
	@GetMapping(path = "/allproducts")
	public List<Product> getAllProducts(){
		logger.info("Display All Products");
		return productService.getAllProducts();
	}
	@GetMapping(path = "/allproductsbycategory/{id}")
	public List<Product> getAllProductsByCategory(@PathVariable Long id){
		logger.info("Display All Products");
		return productService.getProductsByCategoryId(id);
	}
	
	@GetMapping(path = "/{id}")
	public Product getProduct(@PathVariable Long id) {
		logger.info("Display Product id: "+id);
		return productService.getProduct(id);
	}
	
	@PostMapping(path = "/create")
	public Product createProduct(@Valid @RequestBody ProductRequest product) {
		logger.info("Created Product: "+product);
		return productService.createProduct(product);
	}
	
	@PutMapping(path = "/update/{id}")
	public Product updateProduct(@PathVariable Long id,@Valid @RequestBody ProductRequest product) {
		logger.info("Updated Product id: "+id + " details, product: "+ product);
		return productService.updateProduct(id, product);
	}
	
	
	@DeleteMapping(path = "/delete/{id}")
	public String deleteProduct(@PathVariable Long id) {
		logger.info("Deleted Product id: "+id);
		return productService.deleteProduct(id);
	}
	
}
