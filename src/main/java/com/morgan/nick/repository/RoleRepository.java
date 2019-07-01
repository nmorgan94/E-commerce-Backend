package com.morgan.nick.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.morgan.nick.model.Role;
import com.morgan.nick.model.RoleName;

public interface RoleRepository extends CrudRepository<Role, Long>  {
	Optional<Role> findByName(RoleName roleName);
}
