package com.example.train_booking.repository;

import com.example.train_booking.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
    List<Trip> findByArrivalLocationAndDepartureLocation(String arrivalLocation, String departureLocation);
    List<Trip> findByArrivalLocationAndDepartureLocationAndDepartureTimeBetween( String arrivalLocation, String departureLocation, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
