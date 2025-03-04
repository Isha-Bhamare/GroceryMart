package com.cognizant.OnlineGroceryMart.exception;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFoundException(Exception ex, WebRequest request) throws Exception{
		ErrorResponse errorResponse = new ErrorResponse(
				LocalDate.now(),
				ex.getMessage(),
				request.getDescription(false));
		
		return new ResponseEntity<ErrorResponse>(errorResponse,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ProductNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleProductNotFoundException(Exception ex, WebRequest request) throws Exception{
		ErrorResponse errorResponse = new ErrorResponse(
				LocalDate.now(),
				ex.getMessage(),
				request.getDescription(false));
		
		return new ResponseEntity<ErrorResponse>(errorResponse,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleCategoryNotFoundException(Exception ex, WebRequest request) throws Exception{
		ErrorResponse errorResponse = new ErrorResponse(
				LocalDate.now(),
				ex.getMessage(),
				request.getDescription(false));
		
		return new ResponseEntity<ErrorResponse>(errorResponse,HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(CartNotFoundException.class)
	public ResponseEntity<ErrorResponse> CartNotFoundException(Exception ex, WebRequest request) throws Exception{
		ErrorResponse errorResponse = new ErrorResponse(
				LocalDate.now(),
				ex.getMessage(),
				request.getDescription(false));
		
		return new ResponseEntity<ErrorResponse>(errorResponse,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ProductAlreadyExistException.class)
	public ResponseEntity<ErrorResponse> handleProductAlreadyExistException(Exception ex, WebRequest request) throws Exception{
		ErrorResponse errorResponse = new ErrorResponse(
				LocalDate.now(),
				ex.getMessage(),
				request.getDescription(false));
		
		return new ResponseEntity<ErrorResponse>(errorResponse,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ProductQuantityOutOfStockException.class)
	public ResponseEntity<ErrorResponse> handleProductQuantityOutOfStockException(Exception ex, WebRequest request) throws Exception{
		ErrorResponse errorResponse = new ErrorResponse(
				LocalDate.now(),
				ex.getMessage(),
				request.getDescription(false));
		
		return new ResponseEntity<ErrorResponse>(errorResponse,HttpStatus.BAD_REQUEST);
	}
	
}
