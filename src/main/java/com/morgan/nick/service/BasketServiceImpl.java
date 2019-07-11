package com.morgan.nick.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morgan.nick.exception.ResourceNotFoundException;
import com.morgan.nick.model.Basket;
import com.morgan.nick.model.BasketItem;
import com.morgan.nick.repository.BasketRepository;

@Service
@Transactional
public class BasketServiceImpl implements BasketService{
	
    private BasketRepository basketRepository;

    public BasketServiceImpl(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Override
    public Basket getBasket(long id) {
        return basketRepository
          .findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Basket not found"));
    }
    
    
    @Override
    public Basket save(Basket basket) {
        return basketRepository.save(basket);
    }

	@Override
	public double calculateBasketPrice(Basket basket) {
		List<BasketItem> basketContents = basket.getBasketContent();
		double sum = 0;
		for(BasketItem basketItem : basketContents) {
			sum += basketItem.getTotalPrice();
		}
		basket.setBasketPrice(sum);
		return sum;
	}
	
	@Override
	public void setBasketContent(Basket basket, List<BasketItem> basketContents) {
		basket.setBasketContent(basketContents);
	}

	@Override
	public Iterable<Basket> getAllBaskets() {
		return basketRepository.findAll();
	}
	
	
	@Override
	public void deleteAllBaskets() {
		basketRepository.deleteAll();
	}
		
	
	@Override
	public Basket combineBaskets(Basket authenticatedBasket, Basket anonymousBasket) {
		List<BasketItem> authenticatedBasketContents = authenticatedBasket.getBasketContent();
		List<BasketItem> anonymousBasketContents = anonymousBasket.getBasketContent();
		List<Long> productIdList = authenticatedBasketContents.stream().map(n -> n.getProduct().getId()).collect(Collectors.toList());
			
		anonymousBasketContents.forEach(anonymousItem ->{
			if(productIdList.contains(anonymousItem.getProduct().getId())) {
				BasketItem authenticatedItem = getBasketItemByProductId(authenticatedBasketContents, anonymousItem.getProduct().getId());
				authenticatedItem.setQuantity(authenticatedItem.getQuantity()+anonymousItem.getQuantity());
			}
			else {
				authenticatedBasketContents.add(anonymousItem);
			}
		});
		
		return authenticatedBasket;
	}
	
	public BasketItem getBasketItemByProductId(List<BasketItem> basketContents, long id) {

		BasketItem basketItem = basketContents.stream()
				  .filter(item -> id == item.getProduct().getId())
				  .findAny()
				  .orElse(null);
		
		return basketItem;
	}
	
	public void test(long id) {
		
	}

}
