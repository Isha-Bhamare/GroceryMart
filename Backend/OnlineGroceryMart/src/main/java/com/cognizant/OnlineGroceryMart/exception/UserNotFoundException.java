package com.cognizant.OnlineGroceryMart.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException{
	
	Logger logger = LoggerFactory.getLogger(UserNotFoundException.class);
	
	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String message) {
		super(message);
		logger.error("UserNotFoundException exception");
	}
}
