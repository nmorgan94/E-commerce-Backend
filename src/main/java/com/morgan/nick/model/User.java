package com.morgan.nick.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String firstName;
    private String secondName;
    private String password;
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "basket_id", referencedColumnName = "id")
    private Basket basket;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User() {
        this.basket = new Basket();
    }

    public User(String firstName, String username, String email, String password) {
        this.firstName = firstName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.basket = new Basket();
    }

}
