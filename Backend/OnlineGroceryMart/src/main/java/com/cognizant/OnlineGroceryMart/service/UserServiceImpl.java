package com.cognizant.OnlineGroceryMart.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.OnlineGroceryMart.entity.Cart;
import com.cognizant.OnlineGroceryMart.entity.User;
import com.cognizant.OnlineGroceryMart.exception.UserNotFoundException;
import com.cognizant.OnlineGroceryMart.repository.CartRepository;
import com.cognizant.OnlineGroceryMart.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CartRepository cartRepository;

	
	@Override
	public User getUser(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() ->  new UserNotFoundException("User Not Found of Id : " + id));
		
		logger.info("getUser service");
		
		return user;
	}
	
	@Override 
	public User getUserByEmailAndPassword(String email, String password) {
		logger.info("getUserByEmailAndPassword service");
		User user = userRepository.findByEmailAndPassword(email, password); 
		if(user == null) { 
			
			throw new UserNotFoundException("User Not Found "); 
		} 
		return user; 
	}

	@Override
	public User createUser(User user) {
		User createUser = userRepository.save(user);
		Cart createCart = new Cart();
		createCart.setUser(createUser);
		createCart.setTotalPrice(0);
		cartRepository.save(createCart);
		
		logger.info("createUser service");
		
		return createUser;
	}
	

	@Override
	public User updateUser(Long id,User user) {
		User existedUser = getUser(id);
		if(user.getName() != null) {
			existedUser.setName(user.getName());			
		}
		
		if(user.getEmail() != null) {
			existedUser.setEmail(user.getEmail());			
		}
		
		if(user.getPhoneNo() != null) {
			existedUser.setPhoneNo(user.getPhoneNo());			
		}
		if(user.getAddress() != null) {
			existedUser.setAddress(user.getAddress());
		}
		
		logger.info("updateUser service");
		
		return userRepository.save(existedUser);
	}

	@Override
	public String deleteUser(Long id) {
		User user = getUser(id);
		Cart cart = cartRepository.findByUserId(user.getId());
		cartRepository.delete(cart);
		userRepository.delete(user);
		
		logger.info("deleteUser service");
		
		return String.format("User %d is Deleted!", id);
	}
	
}
