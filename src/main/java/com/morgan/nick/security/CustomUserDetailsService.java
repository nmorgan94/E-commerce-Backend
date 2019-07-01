package com.morgan.nick.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.morgan.nick.exception.ResourceNotFoundException;
import com.morgan.nick.model.User;
import com.morgan.nick.repository.UserRepository;

@Service
	public class CustomUserDetailsService implements UserDetailsService {

	    @Autowired
	    UserRepository userRepository;

	    @Override
	    @Transactional
	    public UserDetails loadUserByUsername(String usernameOrEmail)
	            throws UsernameNotFoundException {
	        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
	                .orElseThrow(() ->
	                        new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
	        );

	        return UserPrincipal.create(user);
	    }

	    @Transactional
	    public UserDetails loadUserById(Long id) {
	        User user = userRepository.findById(id).orElseThrow(
	            () -> new ResourceNotFoundException("User Not Found")
	        );

	        return UserPrincipal.create(user);
	    }
	
	
}
