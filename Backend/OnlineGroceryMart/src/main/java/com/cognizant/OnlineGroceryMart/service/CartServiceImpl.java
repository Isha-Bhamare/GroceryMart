package com.cognizant.OnlineGroceryMart.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.OnlineGroceryMart.entity.Cart;
import com.cognizant.OnlineGroceryMart.entity.CartItem;
import com.cognizant.OnlineGroceryMart.entity.Product;
import com.cognizant.OnlineGroceryMart.entity.User;
import com.cognizant.OnlineGroceryMart.exception.CartNotFoundException;
import com.cognizant.OnlineGroceryMart.exception.ProductAlreadyExistException;
import com.cognizant.OnlineGroceryMart.exception.ProductNotFoundException;
import com.cognizant.OnlineGroceryMart.exception.ProductQuantityOutOfStockException;
import com.cognizant.OnlineGroceryMart.repository.CartItemRepository;
import com.cognizant.OnlineGroceryMart.repository.CartRepository;
import com.cognizant.OnlineGroceryMart.request.CartRequest;

@Service
public class CartServiceImpl implements CartService{

	Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private AdminProductService productService;
	
	@Autowired
	private UserService userService;
	

	@Override
	public Cart getCart(Long id) {
		Cart cart = cartRepository.findById(id).orElseThrow(()->new CartNotFoundException("Cart not found") );
		return cart;
	}

	@Override
	public Cart getCartByUser(Long id) {
		Cart cart = cartRepository.findByUserId(id);
		if(cart == null ) {
			throw new CartNotFoundException("Cart not found");
		}
		return cart;
	}
	

	@Override
	public Cart addCartItem(CartRequest cartRequest) {
		Product product = productService.getProduct(cartRequest.getProductId());
		User user = userService.getUser(cartRequest.getUserId());
		
		Cart cart = getCartByUser(user.getId());
		
		for(CartItem item:cart.getCartItems()) {
			if(item.getProduct().getId() == product.getId()) {
				 throw new ProductAlreadyExistException("Product already exists of Id :" + product.getId());
			}
		}
		
		if(product.getStock() < cartRequest.getQuantity()) {
			throw new ProductQuantityOutOfStockException("Product quantity out of stock!");
		}
		
		CartItem cartItem = new CartItem();
		cartItem.setProduct(product);
		cartItem.setQuantity(cartRequest.getQuantity());
		cartItem.setCart(cart);
		cartItemRepository.save(cartItem);
		
		cart.setCartItem(cartItem);
		
		int total = 0;
		for(CartItem item : cart.getCartItems()) {
			total += (item.getProduct().getDiscountPrice()) * (item.getQuantity());
		}
		
		cart.setTotalPrice(total);
		
		logger.info("addCartItem service");
		
		return cartRepository.save(cart);
	}
	

	@Override
	public Cart increaseQuantity(Long productId,Long userId) {
		Product product = productService.getProduct(productId);
		User user = userService.getUser(userId);
		Cart cart = getCartByUser(user.getId());
		
		
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);
		
		
		if(product.getStock() < cartItem.getQuantity() + 1) {
				throw new ProductQuantityOutOfStockException("Product quantity out of stock!");
		}
		
		cart.setTotalPrice(cart.getTotalPrice() + product.getDiscountPrice());
		cartItem.setQuantity(cartItem.getQuantity() + 1);
		cartItemRepository.save(cartItem);
		
		logger.info("increaseQuantity service");
		
		return cartRepository.save(cart);	
	}

	@Override
	public Cart decreaseQuantity(Long productId,Long userId) {
		Product product = productService.getProduct(productId);
		User user = userService.getUser(userId);
		
		Cart cart = getCartByUser(user.getId());
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

		if(cartItem == null) {
			throw new ProductNotFoundException("Product not in cart!");
		}
		
		if(cartItem.getQuantity() == 1) {
			return removeProduct(productId,userId);
		}
		
//		cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getQuantity() * product.getDiscountPrice()));
		
		cartItem.setQuantity(cartItem.getQuantity() - 1);
		cart.setTotalPrice(cart.getTotalPrice() - product.getDiscountPrice() );
		cartItemRepository.save(cartItem);
		
		logger.info("decreaseQuantity service");
		
		return cartRepository.save(cart);
	}

	@Override
	public Cart removeProduct(Long productId, Long userId) {
		Product product = productService.getProduct(productId);
		User user = userService.getUser(userId);
		
		Cart cart = getCartByUser(user.getId());
		CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);
		
		if(cartItem == null) {
			throw new ProductNotFoundException("Product not in cart!");
		}
		
		cart.setTotalPrice(cart.getTotalPrice() - (product.getDiscountPrice() * cartItem.getQuantity()));
		cart.removeCartItem(cartItem);
		cartItemRepository.delete(cartItem);
		
		logger.info("removeProduct service");
		
		return cartRepository.save(cart);
	}

	
}
