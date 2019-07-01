package com.morgan.nick.model;
import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "basketitem")
public class BasketItem implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long basketItemId;

	@ManyToOne
	@JoinColumn(name = "productId")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "basketId")
	@JsonIgnore
	private Basket basket;
		
	private double totalPrice;
	
	private int quantity;




}