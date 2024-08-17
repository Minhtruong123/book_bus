package com.example.train_booking.repository;

import com.example.train_booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    List<User> findAll();
    List<User> findAllByUsernameContaining(String username);
}
