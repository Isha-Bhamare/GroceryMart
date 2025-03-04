package com.cognizant.OnlineGroceryMart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.OnlineGroceryMart.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
