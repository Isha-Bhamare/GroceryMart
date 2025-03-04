package com.cognizant.OnlineGroceryMart;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.cognizant.OnlineGroceryMart.controller.CartController;
import com.cognizant.OnlineGroceryMart.entity.Cart;
import com.cognizant.OnlineGroceryMart.entity.CartItem;
import com.cognizant.OnlineGroceryMart.entity.Category;
import com.cognizant.OnlineGroceryMart.entity.Product;
import com.cognizant.OnlineGroceryMart.entity.User;
//import com.cognizant.OnlineGroceryMart.repository.CartRepository;
import com.cognizant.OnlineGroceryMart.request.CartRequest;
import com.cognizant.OnlineGroceryMart.service.CartService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class CartControllerTest {
	
	@Mock
	private CartService cartService;

	@InjectMocks
	private CartController cartController;
	
	@Test
	public void testGetCart() {
		Long cartId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.totalPrice(0)
				.build();
		
		when(cartService.getCart(cartId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.getCart(cartId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	
	@Test
	public void testGetCartByUser() {
		Long userId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.totalPrice(0)
				.build();
		
		when(cartService.getCartByUser(userId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.getCartByUserId(userId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testAddCartItem() {
		
		User user = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
				
		Category category = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Product product = Product.builder()
			    .id(1L)
				.name("Fill The Love")
				.name("Kurkure Masala Munch")
				.description("Kurkure Masala Munch is a crunchy and crispy snack.")
				.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
				.price(20)
				.discountPrice(18)
				.stock(10)
				.category(category)
				.build();
		
		CartItem cartItem = CartItem.builder()
				.id(1L)
				.product(product)
				.quantity(1)
				.build();
		
		List<CartItem> cartItems = Arrays.asList(cartItem);
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.cartItems(cartItems)
				.totalPrice(18)
				.build();
		
		CartRequest cartRequest = CartRequest.builder()
				.userId(1L)
				.productId(1L)
				.quantity(1)
				.build();
		
		
		when(cartService.addCartItem(cartRequest)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.addCartItem(cartRequest);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testIncreaseQuantity() {
		Long userId = 1L;
		Long ProductId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
				
		Category category = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Product product = Product.builder()
			    .id(1L)
			    .name("Fill The Love")
				.name("Kurkure Masala Munch")
				.description("Kurkure Masala Munch is a crunchy and crispy snack.")
				.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
				.price(20)
				.discountPrice(18)
				.stock(10)
				.category(category)
				.build();
		
		CartItem cartItem = CartItem.builder()
				.id(1L)
				.product(product)
				.quantity(2)
				.build();
		
		List<CartItem> cartItems = Arrays.asList(cartItem);
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.cartItems(cartItems)
				.totalPrice(36)
				.build();
		
		System.out.println(expectedCart);
		
		when(cartService.increaseQuantity(ProductId,userId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.increaseQuantityOfProduct(ProductId,userId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testDecreaseQuantity() {
		Long userId = 1L;
		Long ProductId = 1L;
		
		User user = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
				
		Category category = Category.builder()
				.id(1L)
				.name("Namkeen and Snacks")
				.build();
		
		Product product = Product.builder()
			    .id(1L)
			    .name("Fill The Love")
				.name("Kurkure Masala Munch")
				.description("Kurkure Masala Munch is a crunchy and crispy snack.")
				.image("https://www.jiomart.com/images/product/600x600/490003816/kurkure-masala-munch-77-g-product-images-o490003816-p490003816-0-202303220254.jpg")
				.price(20)
				.discountPrice(18)
				.stock(10)
				.category(category)
				.build();
		
		CartItem cartItem = CartItem.builder()
				.id(1L)
				.product(product)
				.quantity(1)
				.build();
		
		List<CartItem> cartItems = Arrays.asList(cartItem);
		
		Cart expectedCart = Cart.builder()
				.id(1L)
				.user(user)
				.cartItems(cartItems)
				.totalPrice(18)
				.build();
		
		System.out.println(expectedCart);
		
		when(cartService.decreaseQuantity(ProductId,userId)).thenReturn(expectedCart);
		
		Cart responseCart = cartController.decreaseQuantityOfProduct(ProductId,userId);
		
		assertEquals(expectedCart, responseCart);
		
	}
	
	@Test
	public void testRemoveProduct() {
	    Long cartId = 1L;
	    Long productId = 1L;

	    CartItem cartItem = CartItem.builder()
	            .id(1L)
	            .product(Product.builder()
	                    .id(productId)
	                    .build())
	            .quantity(1)
	            .build();

	    Cart expectedCart = Cart.builder()
	            .id(cartId)
	            .cartItems(Arrays.asList(cartItem))
	            .totalPrice(18)
	            .build();

	    when(cartService.removeProduct(cartId, productId)).thenReturn(expectedCart);

	    Cart responseCart = cartController.removeProduct(cartId, productId);

	    assertEquals(expectedCart, responseCart);

	    verify(cartService).removeProduct(cartId, productId);
	}



}
