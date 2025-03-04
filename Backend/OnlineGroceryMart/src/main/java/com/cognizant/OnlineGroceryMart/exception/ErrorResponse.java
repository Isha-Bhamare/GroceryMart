package com.cognizant.OnlineGroceryMart.exception;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ErrorResponse {
	
	private LocalDate timestamp;

	private String message;
	
	private String details;
}
