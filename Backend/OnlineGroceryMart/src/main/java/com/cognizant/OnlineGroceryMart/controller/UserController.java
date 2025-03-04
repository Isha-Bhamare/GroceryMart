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

import com.cognizant.OnlineGroceryMart.entity.User;
import com.cognizant.OnlineGroceryMart.request.UserRequest;
import com.cognizant.OnlineGroceryMart.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/user")
@CrossOrigin
public class UserController {

	Logger logger = LoggerFactory.getLogger(AdminProductController.class);

	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/{id}")
	public User getUser(@PathVariable Long id) {
		logger.info("Display user:" + id);
		return userService.getUser(id);
	}
	
	@PostMapping(path = "/login")
	public User getUserByEmailAndPassword(@Valid @RequestBody UserRequest userRequest)
	{
		logger.info("Verifying User");
		return userService.getUserByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword());
	}
	
	@PostMapping(path = "/register")
	public User createUser(@Valid @RequestBody User user)
	{
		logger.info("Created User");
		return userService.createUser(user);
	}
	
	@PutMapping(path = "/update/{id}")
	public User updateUser(@PathVariable Long id,@Valid @RequestBody User user) {
		logger.info("Updated User");
		return userService.updateUser(id, user);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public String deleteUser(@PathVariable Long id) {
		logger.info("Deleted User");
		return userService.deleteUser(id);
	}
	

}
