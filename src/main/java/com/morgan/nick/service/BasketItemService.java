package com.morgan.nick.service;

import com.morgan.nick.model.BasketItem;

public interface BasketItemService {
	double calculateTotalPrice(BasketItem basketItem);
	
	BasketItem save(BasketItem basketItem);
}
