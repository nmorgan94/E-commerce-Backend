package com.morgan.nick.controller;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.morgan.nick.model.Basket;
import com.morgan.nick.service.BasketService;

@RestController
public class BasketController {
	
	BasketService basketService;
	
    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }
	
    @RequestMapping(value = "basket/baskets", method = RequestMethod.GET)
    public Iterable<Basket> getBaskets() {
        return basketService.getAllBaskets();
    }
    
    @RequestMapping(value = "basket/createbasket", method = RequestMethod.POST)
	Basket newBasket(Basket newBasket) {
		return basketService.save(newBasket);
	}
    
    @RequestMapping(value = "basket/createbasket/{id}", method = RequestMethod.POST)
	Basket newBasketwithId(@PathVariable Long id) {
    	
		return basketService.save(new Basket(id));
	}
    
    @RequestMapping(value = "basket/baskets/{id}", method = RequestMethod.GET)
    public Basket getProduct(@PathVariable Long id) {
        return basketService.getBasket(id);
    }
        

}
