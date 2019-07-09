package com.morgan.nick.service;

import static org.junit.Assert.*;

import java.io.FileReader;
import java.io.IOException;


import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.morgan.nick.model.Basket;

public class ServiceTest {
	
    @Autowired
    BasketServiceImpl basketServiceImpl;
    
    @Autowired
    BasketItemServiceImpl basketItemServiceImpl;
    
	Gson gson = new Gson();

	@Test
	public void combineBasketTest() throws JsonIOException, IOException {
		
		Basket basket = gson.fromJson(new FileReader("src/test/resources/authBasket.json"), Basket.class);


	}


}
