package com.cognizant.OnlineGroceryMart.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ProductQuantityOutOfStockException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	Logger logger = LoggerFactory.getLogger(ProductQuantityOutOfStockException.class);

	public ProductQuantityOutOfStockException(String message) {
		super(message);
		logger.warn("ProductQuantityOutOfStockException");
	}
	
}
