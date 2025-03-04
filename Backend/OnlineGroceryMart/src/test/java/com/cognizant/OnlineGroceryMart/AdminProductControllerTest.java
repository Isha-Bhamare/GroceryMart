package com.cognizant.OnlineGroceryMart;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.cognizant.OnlineGroceryMart.controller.AdminProductController;
import com.cognizant.OnlineGroceryMart.entity.Category;
import com.cognizant.OnlineGroceryMart.entity.Product;
import com.cognizant.OnlineGroceryMart.request.ProductRequest;
import com.cognizant.OnlineGroceryMart.service.AdminProductService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AdminProductControllerTest {
	
	@Mock
	private AdminProductService productService;

	@InjectMocks
	private AdminProductController productController;
	
	
	@Test
	public void testGetAllProducts() {
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Product product1 = Product.builder()
				    .id(1L)
					.name("Kurkure Masala Munch")
					.description("Kurkure Masala Munch is a crunchy and crispy snack.")
					.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
					.price(20)
					.discountPrice(18)
					.stock(10)
					.category(category1)
					.build();
		
		Product product2 = Product.builder()
				.id(2L)
				.name("Bikaneri Bhujia")
				.description("Bikaneri Bhujia is a crunchy, tasty and flavourful snack.")
				.image("https://www.jiomart.com/images/product/600x600/491416476/bhikharam-chandmal-bikaneri-bhujia-1-kg-product-images-o491416476-p491416476-0-202203151830.jpg")
				.price(390)
				.discountPrice(195)
				.stock(15)
				.category(category1)
				.build();
		
		List<Product> expectedProducts = Arrays.asList(product1,product2);
		
		when(productService.getAllProducts()).thenReturn(expectedProducts);
		
		List<Product> responseProducts = productController.getAllProducts();
		
		assertEquals(expectedProducts, responseProducts);
		
	}
	
	@Test
	public void testGetProduct() {
		Long productId = 1L;
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Product expectedProduct = Product.builder()
				    .id(productId)
				    .name("Kurkure Masala Munch")
					.description("Kurkure Masala Munch is a crunchy and crispy snack.")
					.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
					.price(20)
					.discountPrice(18)
					.stock(10)
					.category(category1)
					.build();
		
		
		when(productService.getProduct(productId)).thenReturn(expectedProduct);
		
		Product responseProduct = productController.getProduct(productId);
		
		assertEquals(expectedProduct, responseProduct);
		
	}
	
	
	@Test
	public void testCreateProduct() {
		Long productId = 1L;
		
		Category category1 = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Product expectedProduct = Product.builder()
					.id(productId)
					.name("Kurkure Masala Munch")
					.description("Kurkure Masala Munch is a crunchy and crispy snack.")
					.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
					.price(20)
					.discountPrice(18)
					.stock(10)
					.category(category1)
					.build();
		
		ProductRequest product = ProductRequest.builder()
				.name("Kurkure Masala Munch")
				.description("Kurkure Masala Munch is a crunchy and crispy snack.")
				.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
				.price(20)
				.discountPrice(18)
				.stock(10)
				.categoryId(1L)
				.build();
		
		
		when(productService.createProduct(product)).thenReturn(expectedProduct);
		
		Product responseProduct = productController.createProduct(product);
		
		assertEquals(expectedProduct, responseProduct);
		
	}
	
	@Test
	public void testDeleteProduct() {
	    Long productId = 1L;

	    // Mock the deleteProduct method
	    when(productService.deleteProduct(productId)).thenReturn("Product is Deleted");

	    // Call the deleteProduct method in the productController
	    String isDeleted = productController.deleteProduct(productId);

	    // Verify that the deleteProduct method was called with the correct productId
	    verify(productService).deleteProduct(productId);

	    // Check if the product was successfully deleted
	    assertEquals("Product is Deleted", isDeleted);
	}


}
