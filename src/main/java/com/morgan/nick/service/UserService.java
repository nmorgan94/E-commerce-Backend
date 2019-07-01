package com.morgan.nick.service;


import com.morgan.nick.model.User;

public interface UserService {
	
	public Iterable<User> getAllUsers();
	
	public User addUser(User user);

}
