package com.morgan.nick.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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




}
