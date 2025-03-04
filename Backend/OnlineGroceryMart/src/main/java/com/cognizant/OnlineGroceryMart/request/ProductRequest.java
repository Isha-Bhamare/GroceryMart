package com.cognizant.OnlineGroceryMart.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    private String name;
    private String image;
    private String description;
    private int price;
    private int discountPrice;
    private int stock;
    private Long categoryId;	
	
}
