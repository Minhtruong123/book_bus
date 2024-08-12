package com.example.train_booking.service.Impl;

import com.example.train_booking.entity.User;
import com.example.train_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements com.example.train_booking.service.UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserByName(String username) {
        return userRepository.findByUsername(username);
    }
}
