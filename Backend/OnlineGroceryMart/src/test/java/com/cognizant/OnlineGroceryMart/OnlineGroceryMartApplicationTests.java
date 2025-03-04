package com.cognizant.OnlineGroceryMart;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class OnlineGroceryMartApplicationTests {

	public String hello = "hello";
	@Test
	void contextLoads() {
	}

	@Test
	void checkHello() {
		assertEquals(hello, "hello");
	}

}
