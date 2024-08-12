package com.example.train_booking.service;

import com.example.train_booking.entity.User;

public interface UserService {
    User saveUser(User user);
    User findUserByName(String username);
}
