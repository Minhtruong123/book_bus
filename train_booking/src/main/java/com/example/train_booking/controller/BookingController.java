package com.example.train_booking.controller;

import com.example.train_booking.entity.Booking;
import com.example.train_booking.entity.BookingRequest;
import com.example.train_booking.entity.Ticket;
import com.example.train_booking.entity.User;
import com.example.train_booking.service.Impl.BookingService;
import com.example.train_booking.service.Impl.TicketService;
import com.example.train_booking.service.Impl.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserService userService;
    @Autowired
    private TicketService ticketService;
    @PostMapping("/buy")
    public ResponseEntity<?> buyTicket(@RequestBody BookingRequest bookingRequest) {
        User user = userService.findUserByName(bookingRequest.getUsername());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user");
        }

        Booking booking = Booking.builder()
                .user(user)
                .bookingDate(LocalDateTime.now())
                .build();
        bookingService.saveBooking(booking);

        for (Integer ticketId: bookingRequest.getListId()) {
            Ticket ticket = ticketService.findById(ticketId);
            if (ticket == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ticket ID: " + ticketId);
            }
            if (ticket.getBooked()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Ticket already booked");
            }
            ticket.setBooking(booking);
            ticket.setBooked(true);
            booking.setTickets(List.of(ticket));
            ticketService.saveTicket(ticket);
        }

        return ResponseEntity.noContent().build();
    }
}
