package com.example.train_booking.controller;

import com.example.train_booking.entity.Trip;
import com.example.train_booking.service.Impl.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/trip")
public class TripController {
    @Autowired
    private TripService tripService;
    @GetMapping("/get-trips")
    public ResponseEntity<?> getTrips(
            @RequestParam String arrivalLocation,
            @RequestParam String departureLocation,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Trip> trips = tripService.getTripsByLocationAndDate(arrivalLocation, departureLocation, date);
        if (trips.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(trips);
        }
    }
}
