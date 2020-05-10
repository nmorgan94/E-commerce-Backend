package com.morgan.nick.service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.morgan.nick.model.Basket;
import com.morgan.nick.model.BasketItem;
import com.morgan.nick.model.Product;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JsonBuilder {
	
	@Autowired
	BasketItemService basketItemService;
  
	Gson gson = new Gson();
	
    Product product1 = new Product(1L, "TV Set", 300.00, "https://via.placeholder.com/200X100?text=1");
    Product product2 = new Product(2L, "Game Console", 200.00, "https://via.placeholder.com/200X100?text=2");
    Product product3 = new Product(3L, "Sofa", 100.00, "https://via.placeholder.com/200X100?text=3");
    Product product4 = new Product(4L, "Icecream", 5.00, "https://via.placeholder.com/200X100?text=4");
    Product product5 = new Product(5L, "Beer", 3.00, "https://via.placeholder.com/200X100?text=5");
    Product product6 = new Product(6L, "Phone", 500.00, "https://via.placeholder.com/200X100?text=6");

	@Test
	public void buildBasketJson() throws JsonIOException, IOException {
			
		BasketItem item1 = new BasketItem();
		item1.setProduct(product1);
		item1.setQuantity(1);
		BasketItem item2 = new BasketItem();
		item2.setProduct(product2);
		item2.setQuantity(1);
		BasketItem item3 = new BasketItem();
		item3.setProduct(product3);
		item3.setQuantity(1);
		BasketItem item4 = new BasketItem();
		item4.setProduct(product4);
		item4.setQuantity(1);
		BasketItem item5 = new BasketItem();
		item5.setProduct(product5);
		item5.setQuantity(1);
		BasketItem item6 = new BasketItem();
		item6.setProduct(product6);
		item6.setQuantity(1);

		
		ArrayList<BasketItem> basketContents = new ArrayList<BasketItem>();
		basketContents.add(item1);
		basketContents.add(item2);
		basketContents.add(item3);
		basketContents.add(item4);
		basketContents.add(item5);


		
		Basket authBasket = new Basket();
		authBasket.setBasketContent(basketContents);
		authBasket.setId(1L);
		
		try (Writer writer = new FileWriter("src/test/resources/authBasket.json")) {
		    gson.toJson(authBasket, writer);
		}

	}
	

	@Test
	public void buildBasketJson2() throws JsonIOException, IOException {
		

        Product product5 = new Product(5L, "Beer", 3.00, "https://via.placeholder.com/200X100?text=5");
        Product product6 = new Product(6L, "Phone", 500.00, "https://via.placeholder.com/200X100?text=6");


		BasketItem item5 = new BasketItem();
		item5.setProduct(product5);
		item5.setQuantity(1);
		item5.setTotalPrice(basketItemService.calculateTotalPrice(item5));
		BasketItem item6 = new BasketItem();
		item6.setProduct(product6);
		item6.setQuantity(1);
		item6.setTotalPrice(basketItemService.calculateTotalPrice(item6));
		
		ArrayList<BasketItem> basketContents = new ArrayList<BasketItem>();

		basketContents.add(item5);
		basketContents.add(item6);

		Basket anonBasket = new Basket();
		anonBasket.setBasketContent(basketContents);
		anonBasket.setId(1L);
		
		
		
		try (Writer writer = new FileWriter("src/test/resources/anonBasket.json")) {
		    gson.toJson(anonBasket, writer);
		}

	}


}
