package com.cognizant.OnlineGroceryMart.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.OnlineGroceryMart.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	public List<Product> findByCategoryId(Long categoryId);
	public List<Product> findByName(String name);
}
