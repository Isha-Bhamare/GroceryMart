package com.cognizant.OnlineGroceryMart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.OnlineGroceryMart.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>{
	
	public Cart findByUserId(Long id);
}
