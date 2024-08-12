package com.example.train_booking.service.Impl;

import com.example.train_booking.entity.Ticket;
import com.example.train_booking.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService implements com.example.train_booking.service.TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<Ticket> getAllTicket() {
        return ticketRepository.findAll();
    }

    @Override
    public List<Ticket> getAllTicketByTripId(Integer id) {
        return ticketRepository.findAllByTripId(id);
    }

    @Override
    public Ticket findById(Integer id) {
        return ticketRepository.findById(id).orElse(null);
    }

    @Override
    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }
}
