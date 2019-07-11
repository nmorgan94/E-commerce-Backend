package com.morgan.nick.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "basket")
public class Basket implements Serializable {
	
	public Basket(long id) {
		this.id = id;

	}
	
	public Basket() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@OneToMany(mappedBy = "basket", cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	private List<BasketItem> basketContent;
	
	private double basketPrice;
	
	@OneToOne(mappedBy = "basket")
	private User user;


}