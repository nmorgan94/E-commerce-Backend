package com.morgan.nick.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morgan.nick.exception.ResourceNotFoundException;
import com.morgan.nick.model.Product;
import com.morgan.nick.model.Role;
import com.morgan.nick.model.User;
import com.morgan.nick.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        return userRepository.save(user);
    }
    
    @Override
    public User getUser(long id) {
        return userRepository
          .findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }


}
