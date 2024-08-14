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
import java.util.List;

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
    public ResponseEntity<?> buyTicket(@RequestBody BookingRequest bookingRequest, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
        String username = principal.getName();
        User user = userService.findUserByName(username);
        Ticket ticket = ticketService.findById(bookingRequest.getId());

        if (user == null || ticket == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user or ticket");
        }

        if (ticket.getBooked()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Ticket already booked");
        }

        Booking booking = Booking.builder()
                .user(user)
                .bookingDate(LocalDateTime.now())
                .build();

        ticket.setBooking(booking);
        ticket.setBooked(true);
        booking.setTickets(List.of(ticket));

        bookingService.saveBooking(booking);
        ticketService.saveTicket(ticket);

        return ResponseEntity.ok("Ticket purchased successfully");
    }
}
