package com.cognizant.OnlineGroceryMart.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CartNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	Logger logger = LoggerFactory.getLogger(CartNotFoundException.class);

	public CartNotFoundException(String message) {
		super(message);
		logger.error("CartNotFoundException exception");
	}

}
