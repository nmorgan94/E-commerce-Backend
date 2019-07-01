package com.morgan.nick.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morgan.nick.model.Role;
import com.morgan.nick.repository.RoleRepository;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
	
    private RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
	
    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

}
