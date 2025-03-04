package com.cognizant.OnlineGroceryMart.controller;

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

import com.cognizant.OnlineGroceryMart.entity.Cart;
import com.cognizant.OnlineGroceryMart.request.CartRequest;
import com.cognizant.OnlineGroceryMart.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/cart")
@CrossOrigin
public class CartController {

	Logger logger = LoggerFactory.getLogger(AdminProductController.class);

	@Autowired
	private CartService cartService;
	
	@GetMapping(path = "/{id}")
	public Cart getCart(@PathVariable Long id) {
		logger.info("Display Cart:" + id);
		return cartService.getCart(id);
	}
	
	@GetMapping(path = "/getCartByUserId/{id}")
	public Cart getCartByUserId(@PathVariable Long id) {
		logger.info("Display Cart by user id:" + id);
		return cartService.getCartByUser(id);
	}
	
	
	@PostMapping(path ="/addToCart")
	public Cart addCartItem(@Valid @RequestBody CartRequest cartRequest) {
		logger.info("Item add to  Cart "+ cartRequest);
		return cartService.addCartItem(cartRequest);
	}
	
	@PutMapping(path = "/increaseQuantity/{productId}/{userId}")
	public Cart increaseQuantityOfProduct(@PathVariable Long productId,@PathVariable Long userId) {
		logger.info("Increase Quantity of Product id "+ productId + "in cart of user id: "+ userId);
		return cartService.increaseQuantity(productId, userId);
		
	}
	
	@PutMapping(path = "/descreaseQuantity/{productId}/{userId}")
	public Cart decreaseQuantityOfProduct(@PathVariable Long productId,@PathVariable Long userId) {
		logger.info("Decrease Quantity of Product id "+ productId + "in cart of user id: "+ userId);
		return cartService.decreaseQuantity(productId, userId);
		
	}
	
	@DeleteMapping(path = "/removeProduct/{productId}/{userId}")
	public Cart removeProduct(@PathVariable Long productId,@PathVariable Long userId) {
		logger.info("Product id "+ productId + " remove from cart of user id: "+ userId);
		return cartService.removeProduct(productId,userId);
	}

	
}
