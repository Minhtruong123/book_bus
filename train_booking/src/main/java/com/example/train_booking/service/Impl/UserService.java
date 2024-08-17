package com.example.train_booking.service.Impl;

import com.example.train_booking.dto.UserDTO;
import com.example.train_booking.entity.User;
import com.example.train_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements com.example.train_booking.service.UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO findUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getGmail(),
                user.getRole(),
                user.getPhoneNumber()
        );
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserByName(String username) {
        return userRepository.findByUsername(username);
    }
    @Override
    public List<UserDTO> findAllUser(String username) {
        List<User> users;
        if (username == null || username.trim().isEmpty()) {
            users = userRepository.findAll();
        } else {
            users = userRepository.findAllByUsernameContaining(username);
        }
        return users.stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getGmail(),
                        user.getRole(),
                        user.getPhoneNumber()))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    @Override
    public User updateUser(User updateUser, Integer id) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (updateUser.getUsername() != null) {
                existingUser.setUsername(updateUser.getUsername());
            }
            if (updateUser.getGmail() != null) {
                existingUser.setGmail(updateUser.getGmail());
            }
            if (updateUser.getPhoneNumber() != null) {
                existingUser.setPhoneNumber(updateUser.getPhoneNumber());
            }
            if (updateUser.getRole() != null) {
                existingUser.setRole(updateUser.getRole());
            }
            if (updateUser.getPassword() != null) {
                existingUser.setPassword(updateUser.getPassword());
            }

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}
