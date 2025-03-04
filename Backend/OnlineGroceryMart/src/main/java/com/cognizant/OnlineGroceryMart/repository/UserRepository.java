package com.cognizant.OnlineGroceryMart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.OnlineGroceryMart.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmailAndPassword(String email, String password);
}
