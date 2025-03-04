package com.cognizant.OnlineGroceryMart.service;

import com.cognizant.OnlineGroceryMart.entity.Cart;
import com.cognizant.OnlineGroceryMart.request.CartRequest;

public interface CartService {
		
	Cart getCart(Long id);
	Cart getCartByUser(Long id);
	Cart addCartItem(CartRequest cartRequest);
	Cart increaseQuantity(Long productId,Long userId);
	Cart decreaseQuantity(Long productId,Long userId);
	Cart removeProduct(Long productId,Long userId);
	
}
