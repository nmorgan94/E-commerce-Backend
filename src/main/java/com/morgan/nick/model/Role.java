package com.morgan.nick.model;

import javax.persistence.*;

import org.hibernate.annotations.NaturalId;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    public Role() {

    }

    public Role(RoleName name) {
        this.name = name;
    }

}
