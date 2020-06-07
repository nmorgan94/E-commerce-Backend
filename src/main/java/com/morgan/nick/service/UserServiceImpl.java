package com.morgan.nick.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morgan.nick.exception.ResourceNotFoundException;
import com.morgan.nick.model.Basket;
import com.morgan.nick.model.User;
import com.morgan.nick.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
    private UserRepository userRepository;
    private final BasketService basketService;

    public UserServiceImpl(UserRepository userRepository, BasketService basketService) {
        this.userRepository = userRepository;
        this.basketService = basketService;
    }



    
    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

	@Override
	public User addUser(User user) {
		return this.userRepository.save(user);
	}

    @Override
    public User save(User user) {
        Basket basket = new Basket();
        basket = basketService.save(basket);
        user.setBasketId(basket.getId());
        return userRepository.save(user);
    }
    
    @Override
    public User getUser(long id) {
        return userRepository
          .findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }


}
