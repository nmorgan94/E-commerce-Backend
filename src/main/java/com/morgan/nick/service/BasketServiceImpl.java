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
	public void calculateBasketPrice(Basket basket) {
		List<BasketItem> basketContents = basket.getBasketContent();
		double sum = 0;
		for(BasketItem basketItem : basketContents) {
			sum += basketItem.getTotalPrice();
		}
		basket.setBasketPrice(sum);
		
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
	public Basket combineBaskets(long authenticatedBasketId, long anonymousBasketId) {
		List<BasketItem> authenticatedBasketContents = getBasket(authenticatedBasketId).getBasketContent();
		List<BasketItem> anonymousBasketContents = getBasket(anonymousBasketId).getBasketContent();
		
		List<Long> productIdList = authenticatedBasketContents.stream().map(n -> n.getProduct().getId()).collect(Collectors.toList());
			
		for(BasketItem anonymousItem : anonymousBasketContents) {
			if(productIdList.contains(anonymousItem.getProduct().getId())) {
				authenticatedBasketContents.forEach(authenticatedItem -> {
                    if (anonymousItem.getProduct().getId().equals(authenticatedItem.getProduct().getId())) {
                    	authenticatedItem.setQuantity(authenticatedItem.getQuantity()+anonymousItem.getQuantity());
                    }
                    
                });
			}
			else {
				authenticatedBasketContents.add(anonymousItem);
			}
		}
		
		

		return getBasket(authenticatedBasketId);
	}
	
	//TODO create get basketItem by Product ID method to simplify combine basket
	public BasketItem getBasketItemByProductId() {
		return null;
		
	}

}
