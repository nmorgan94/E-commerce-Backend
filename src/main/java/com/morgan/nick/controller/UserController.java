package com.morgan.nick.controller;
	
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.morgan.nick.model.User;
import com.morgan.nick.security.CurrentUser;
import com.morgan.nick.security.UserPrincipal;
import com.morgan.nick.service.UserService;

@RestController
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
	    this.userService = userService;
}

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	    public  ResponseEntity<Iterable<User>> getUsers() {
		Iterable<User> users = userService.getAllUsers();
	        return new ResponseEntity<>(users, HttpStatus.OK);
	    }
	    
	    
		@RequestMapping(value = "/addUser", method = RequestMethod.POST)
		public ResponseEntity<User> createUser(@Valid @RequestBody User user) {

			if (user != null) {
				return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
			} else
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	    @GetMapping("/user/me")
	    @PreAuthorize("hasRole('USER')")
	    public User getCurrentUser(@CurrentUser UserPrincipal currentUser) {
	    	User user = new User();
	    	user.setFirstName(currentUser.getFirstName());
	        return user;
	    }
		
	}


