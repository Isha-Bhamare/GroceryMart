package com.cognizant.OnlineGroceryMart;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.cognizant.OnlineGroceryMart.controller.UserController;
import com.cognizant.OnlineGroceryMart.entity.User;
import com.cognizant.OnlineGroceryMart.request.UserRequest;
import com.cognizant.OnlineGroceryMart.service.UserService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserControllerTest {
	
	@Mock
	private UserService userService;
	
	@InjectMocks
	private UserController userController;
	
	@Test
	public void testGetUser() {
		Long userId = 1L;
		
		User expectedUser = User.builder()
				.id(userId)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
		when(userService.getUser(userId)).thenReturn(expectedUser);
		
		User responseProduct = userController.getUser(userId);
		
		assertEquals(expectedUser, responseProduct);
		
	}
	

	
	@Test
	public void testGetUserByEmailAndPassword() {
		UserRequest userRequest = UserRequest.builder()
					.email("abhinav@gmail.com")
					.password("Abhinav@123")
					.build();
		
		User expectedUser = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
		when(userService.getUserByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword())).thenReturn(expectedUser);
		
		User responseProduct = userController.getUserByEmailAndPassword(userRequest);
		
		assertEquals(expectedUser, responseProduct);
		
		
	}
	
	@Test
	public void testCreateUser() {
		User expectedUser = User.builder()
				.id(1L)
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
		User user = User.builder()
				.name("Abhinav Mahalley")
				.email("abhinav@gmail.com")
				.phoneNo("1234567890")
				.address("Nagpur, Maharashtra")
				.password("Abhinav@123")
				.build();
		
		when(userService.createUser(user)).thenReturn(expectedUser);
		
		User responseProduct = userController.createUser(user);
		
		assertEquals(expectedUser, responseProduct);
	}
	
	@Test
	public void testDeleteUser() {
	    Long userId = 1L;

	    when(userService.deleteUser(userId)).thenReturn("User deleted");

	    String response = userController.deleteUser(userId);

	    assertEquals("User deleted", response);

	    verify(userService).deleteUser(userId);
	}
	
	
	
	
}
