package com.example.train_booking.service;

import com.example.train_booking.entity.Ticket;

import java.util.List;

public interface TicketService {
    List<Ticket> getAllTicket();
    List<Ticket> getAllTicketByTripId(Integer id);
    Ticket findById(Integer id);
    Ticket saveTicket(Ticket ticket);
}
