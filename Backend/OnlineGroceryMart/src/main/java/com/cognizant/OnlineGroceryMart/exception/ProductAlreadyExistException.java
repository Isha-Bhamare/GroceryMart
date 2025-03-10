package com.cognizant.OnlineGroceryMart.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ProductAlreadyExistException extends RuntimeException {
	
	Logger logger = LoggerFactory.getLogger(ProductAlreadyExistException.class);
	
	private static final long serialVersionUID = 1L;
	
	public ProductAlreadyExistException(String message) {
		super(message);
		logger.warn("ProductAlreadyExistException exception");
	}
}
