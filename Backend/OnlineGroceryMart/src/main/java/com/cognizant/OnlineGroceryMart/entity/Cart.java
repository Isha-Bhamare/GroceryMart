package com.cognizant.OnlineGroceryMart.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Builder
public class Cart {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

	private int totalPrice;
	
    @OneToOne(optional = false,cascade = CascadeType.ALL)
    private User user;
    
//    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @Builder.Default
    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItems = new ArrayList<>();
    
	
	public void setCartItem(CartItem cartItem) {
		this.cartItems.add(cartItem);
	}
	
	public void removeCartItem(CartItem cartItem) {
		this.cartItems.remove(cartItem);
	}
}
