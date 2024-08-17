package com.example.train_booking.service;

import com.example.train_booking.dto.UserDTO;
import com.example.train_booking.entity.User;

import java.util.List;

public interface UserService {
    UserDTO findUserById(Integer id);
    User saveUser(User user);
    User findUserByName(String username);
    List<UserDTO> findAllUser(String username);
    void deleteUser(Integer id);
    User updateUser(User user, Integer id);
}
