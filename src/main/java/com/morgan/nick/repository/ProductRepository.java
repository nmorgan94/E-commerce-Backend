package com.morgan.nick.repository;

import org.springframework.data.repository.CrudRepository;
import com.morgan.nick.model.Product;

public interface ProductRepository extends CrudRepository<Product, Long>{

}
