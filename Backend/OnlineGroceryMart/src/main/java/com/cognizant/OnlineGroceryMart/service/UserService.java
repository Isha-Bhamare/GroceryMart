package com.cognizant.OnlineGroceryMart.service;

import com.cognizant.OnlineGroceryMart.entity.User;

public interface UserService {
	
	User getUser(Long id);
	User createUser(User user);
	User updateUser(Long id,User user);
	String deleteUser(Long id);
	User getUserByEmailAndPassword(String email, String password);
	
}
