package com.example.train_booking.service.Impl;

import com.example.train_booking.entity.Trip;
import com.example.train_booking.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class TripService implements com.example.train_booking.service.TripService {
    @Autowired
    private TripRepository tripRepository;
    @Override
    public List<Trip> getTripsByLocationAndDate(String arrivalLocation, String departureLocation, LocalDate date) {
        if (date != null) {
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(23, 59, 59);
            return tripRepository.findByArrivalLocationAndDepartureLocationAndDepartureTimeBetween(
                    arrivalLocation, departureLocation, startOfDay, endOfDay);
        } else {
            return tripRepository.findByArrivalLocationAndDepartureLocation(arrivalLocation, departureLocation);
        }
    }
}
