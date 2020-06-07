package com.morgan.nick;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.morgan.nick.exception.AppException;
import com.morgan.nick.model.Basket;
import com.morgan.nick.model.BasketItem;
import com.morgan.nick.model.Product;
import com.morgan.nick.model.User;
import com.morgan.nick.repository.UserRepository;
import com.morgan.nick.service.BasketService;
import com.morgan.nick.service.ProductService;

import com.morgan.nick.service.UserService;

@SpringBootApplication
public class ECommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ECommerceApplication.class, args);

    }

    @Autowired
    PasswordEncoder passwordEncoder;


    @Autowired
    UserRepository userRepository;

    @Bean
    @Profile("dev")
    CommandLineRunner runner(ProductService productService, BasketService basketService,
            UserService userService) {
        return args -> {
            productService.save(new Product(1L, "TV Set", 300.00, "https://via.placeholder.com/200X100?text=1"));
            productService.save(new Product(2L, "Game Console", 200.00, "https://via.placeholder.com/200X100?text=2"));
            productService.save(new Product(3L, "Sofa", 100.00, "https://via.placeholder.com/200X100?text=3"));
            productService.save(new Product(4L, "Icecream", 5.00, "https://via.placeholder.com/200X100?text=4"));
            productService.save(new Product(5L, "Beer", 3.00, "https://via.placeholder.com/200X100?text=5"));
            productService.save(new Product(6L, "Phone", 500.00, "https://via.placeholder.com/200X100?text=6"));
            productService.save(new Product(7L, "Watch", 30.00, "https://via.placeholder.com/200X100?text=7"));

            basketService.save(new Basket());


            User user = new User("Nick", "nick94", "nick@morgan.com", passwordEncoder.encode("password"));

            userService.save(user);

        };
    }

}
