package com.example.train_booking.repository;

import com.example.train_booking.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Integer> {
    List<Bus> getAllByLicensePlateContaining(String licensePlate);
}
