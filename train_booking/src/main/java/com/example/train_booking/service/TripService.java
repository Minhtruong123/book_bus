package com.example.train_booking.service;

import com.example.train_booking.entity.Trip;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TripService {
    List<Trip> getTripsByLocationAndDate(String arrivalLocation, String departureLocation, LocalDate date);
}
