package com.morgan.nick.controller;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.morgan.nick.model.Basket;
import com.morgan.nick.model.BasketItem;
import com.morgan.nick.model.Product;
import com.morgan.nick.service.BasketItemService;
import com.morgan.nick.service.BasketService;
import com.morgan.nick.service.ProductService;

@RestController
public class BasketItemController {

	private BasketItemService basketItemService;

	@Autowired
	private BasketService basketService;

	@Autowired
	private ProductService productService;

	public BasketItemController(BasketItemService basketItemService) {
		this.basketItemService = basketItemService;
	}

	@RequestMapping(value = "/basket/add/{productId}", method = RequestMethod.POST)
	public Basket addBasketItem(@PathVariable(value = "productId") long productId) {

		Basket basket = basketService.getBasket(1);
		List<BasketItem> basketContents = basket.getBasketContent();
		Product product = productService.getProduct(productId);

		for (int i = 0; i < basketContents.size(); i++) {
			BasketItem basketItem = basketContents.get(i);
			if (product.getId().equals(basketItem.getProduct().getId())) {
				System.out.println("Product exsists");
				basketItem.setQuantity(basketItem.getQuantity() + 1);
				basketItem.setTotalPrice(basketItemService.calculateTotalPrice(basketItem));
				basketService.calculateBasketPrice(basket);
				return basket;
			}
		}
		System.out.println("Product not in List");
		BasketItem basketItem = new BasketItem();
		basketItem.setQuantity(1);
		basketItem.setProduct(product);
		basketItem.setTotalPrice(product.getPrice());
		basketItem.setBasket(basket);
		basketContents.add(basketItem);
		basketService.calculateBasketPrice(basket);
		return basket;

	}

}
