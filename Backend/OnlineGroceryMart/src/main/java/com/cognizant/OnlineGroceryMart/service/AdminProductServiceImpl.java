package com.cognizant.OnlineGroceryMart.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.cognizant.OnlineGroceryMart.entity.Category;
import com.cognizant.OnlineGroceryMart.entity.Product;
import com.cognizant.OnlineGroceryMart.exception.ProductNotFoundException;
import com.cognizant.OnlineGroceryMart.repository.CategoryRepository;
import com.cognizant.OnlineGroceryMart.repository.ProductRepository;
import com.cognizant.OnlineGroceryMart.request.ProductRequest;

@Service
public class AdminProductServiceImpl implements AdminProductService{

	Logger logger = LoggerFactory.getLogger(AdminProductServiceImpl.class);
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private AdminCategoryService adminCategoryService;

	@Override
	public Product getProduct(Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ProductNotFoundException("Product Not Found of Id :" + id));
		
		logger.info("getProduct service");
		
		return product;
	}
	
	
	@Override
	public List<Product> getAllProducts() {
		List<Product> products = productRepository.findAll();
		
		logger.info("getAllProducts service");
		return products;
	}
	
	
	public List<Product> getProductsByCategoryId(Long categoryId) {
        List<Product> findByCategoryId = productRepository.findByCategoryId(categoryId);
		
        logger.info("getProductsByCategoryId service");
        return findByCategoryId;
    }


	@Override
	public Product createProduct(ProductRequest product) {
		Category category = categoryRepository.findById(product.getCategoryId()).get();
		Product productCreate  = new Product();
		productCreate.setName(product.getName());
		productCreate.setDescription(product.getDescription());
		productCreate.setImage(product.getImage());
		productCreate.setDiscountPrice(product.getDiscountPrice());
		productCreate.setPrice(product.getPrice());
		productCreate.setStock(product.getStock());
		productCreate.setCategory(category);
		
		Product createdProduct = productRepository.save(productCreate);
		
		List<Product> products = new ArrayList<>();
		
		products.add(createdProduct);
		
		category.setProducts(products);
		
        logger.info("createProduct service");
        
		return createdProduct;
	}

	@Override
	public Product updateProduct(Long id, ProductRequest product) {
		Product existingProduct = getProduct(id);
	
		if(product.getName() != null) {
			existingProduct.setName(product.getName());			
		}
		
		if(product.getImage() != null) {
			existingProduct.setImage(product.getImage());			
		}
		
		if(product.getDescription() != null) {
			existingProduct.setDescription(product.getDescription());			
		}
		
		existingProduct.setPrice(product.getPrice());		
		existingProduct.setDiscountPrice(product.getDiscountPrice());			
		
		if(product.getStock() != existingProduct.getStock()) {
			existingProduct.setStock(product.getStock());			
		}
		if(product.getCategoryId() != 0){

            Category category = adminCategoryService.getCategory(product.getCategoryId());

            existingProduct.setCategory(category);

        }
		
        logger.info("updateProduct service");
		
        return productRepository.save(existingProduct);
	}

	@Override
	public String deleteProduct(Long id) {
		Product product = getProduct(id);
        productRepository.delete(product);
        
        logger.info("deleteProduct service");
        
		return String.format("Product %s is Deleted", id);
	}
	
}
