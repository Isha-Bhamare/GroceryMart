package com.cognizant.OnlineGroceryMart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.OnlineGroceryMart.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	public CartItem findByProductId(Long id);
//	public CartItem findByCartId(Long id);
	public CartItem findByCartIdAndProductId(Long cartId, Long productId);
	
}
