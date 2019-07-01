package com.morgan.nick;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.morgan.nick.model.Basket;
import com.morgan.nick.model.BasketItem;
import com.morgan.nick.model.Product;
import com.morgan.nick.model.Role;
import com.morgan.nick.model.RoleName;
import com.morgan.nick.service.BasketService;
import com.morgan.nick.service.ProductService;
import com.morgan.nick.service.RoleService;


@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);

	}
	
    @Bean
    CommandLineRunner runner(ProductService productService, BasketService basketService, RoleService roleService) {
        return args -> {
            productService.save(new Product(1L, "TV Set", 300.00, "https://via.placeholder.com/200X100"));
            productService.save(new Product(2L, "Game Console", 200.00, "https://via.placeholder.com/200X100"));
            productService.save(new Product(3L, "Sofa", 100.00, "https://via.placeholder.com/200X100"));
            productService.save(new Product(4L, "Icecream", 5.00, "https://via.placeholder.com/200X100"));
            productService.save(new Product(5L, "Beer", 3.00, "https://via.placeholder.com/200X100"));
            productService.save(new Product(6L, "Phone", 500.00, "https://via.placeholder.com/200X100"));
            productService.save(new Product(7L, "Watch", 30.00, "https://via.placeholder.com/200X100"));  
            
            basketService.save(new Basket());
            
            roleService.save(new Role(RoleName.ROLE_USER));
            roleService.save(new Role(RoleName.ROLE_ADMIN));
        };
    }
    

}
