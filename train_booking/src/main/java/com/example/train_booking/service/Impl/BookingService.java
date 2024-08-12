package com.example.train_booking.service.Impl;

import com.example.train_booking.entity.Booking;
import com.example.train_booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService implements com.example.train_booking.service.BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
}
