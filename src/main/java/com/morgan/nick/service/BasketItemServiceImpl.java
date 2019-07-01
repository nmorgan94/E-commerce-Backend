package com.morgan.nick.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morgan.nick.model.BasketItem;
import com.morgan.nick.repository.BasketItemRepository;

@Service
@Transactional
public class BasketItemServiceImpl implements BasketItemService{
	
    private BasketItemRepository basketItemRepository;

    public BasketItemServiceImpl(BasketItemRepository basketItemRepository) {
        this.basketItemRepository = basketItemRepository;
    }

	@Override
	public double calculateTotalPrice(BasketItem basketItem) {
		return basketItem.getProduct().getPrice() * basketItem.getQuantity();
	}
	
    @Override
    public BasketItem save(BasketItem basketItem) {
        return basketItemRepository.save(basketItem);
    }

}
