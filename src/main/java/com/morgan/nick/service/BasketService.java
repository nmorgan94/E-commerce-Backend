package com.morgan.nick.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.morgan.nick.model.Basket;
import com.morgan.nick.model.BasketItem;
import com.morgan.nick.model.Product;

public interface BasketService {
	
	 Iterable<Basket> getAllBaskets();
	        	    
	 Basket getBasket(long id);
	 
	 Basket save(Basket basket);
	 
	 void calculateBasketPrice(Basket basket);
	 
	 void setBasketContent(Basket basket, List<BasketItem> basketContents);
	 
	 void deleteAllBaskets();

	Basket combineBaskets(Basket authenticatedBasket, Basket anonymousBasket);
	

}
