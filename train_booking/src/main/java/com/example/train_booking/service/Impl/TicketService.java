package com.example.train_booking.service.Impl;

import com.example.train_booking.dto.TicketDTO;
import com.example.train_booking.entity.Ticket;
import com.example.train_booking.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService implements com.example.train_booking.service.TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<TicketDTO> getAllTicket() {
        List<Ticket> tickets = ticketRepository.findAll();
        return tickets.stream().map(ticket -> new TicketDTO(
                ticket.getId(),
                ticket.getSeatNumber(),
                ticket.getPrice(),
                ticket.getBooked(),
                ticket.getTrip().getDepartureLocation(),
                ticket.getTrip().getArrivalLocation(),
                ticket.getTrip().getDepartureTime(),
                ticket.getTrip().getArrivalTime()
        )).collect(Collectors.toList());
    }

    @Override
    public List<TicketDTO> getAllTicketByTripId(Integer id) {
        List<Ticket> tickets = ticketRepository.findAllByTripId(id);
        return tickets.stream().map(ticket -> new TicketDTO(
                ticket.getId(),
                ticket.getSeatNumber(),
                ticket.getPrice(),
                ticket.getBooked(),
                ticket.getTrip().getDepartureLocation(),
                ticket.getTrip().getArrivalLocation(),
                ticket.getTrip().getDepartureTime(),
                ticket.getTrip().getArrivalTime()
        )).collect(Collectors.toList());
    }

    @Override
    public List<TicketDTO> getAllTicketByUserId(Integer userId) {
        List<Ticket> tickets = ticketRepository.findAllByUserId(userId);
        return tickets.stream().map(ticket -> new TicketDTO(
                ticket.getId(),
                ticket.getSeatNumber(),
                ticket.getPrice(),
                ticket.getBooked(),
                ticket.getTrip().getDepartureLocation(),
                ticket.getTrip().getArrivalLocation(),
                ticket.getTrip().getDepartureTime(),
                ticket.getTrip().getArrivalTime()
        )).collect(Collectors.toList());
    }

    @Override
    public Ticket findById(Integer id) {
        return ticketRepository.findById(id).orElse(null);
    }

    @Override
    public TicketDTO findTicketDTOById(Integer id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        return new TicketDTO(
                ticket.getId(),
                ticket.getSeatNumber(),
                ticket.getPrice(),
                ticket.getBooked(),
                ticket.getTrip().getDepartureLocation(),
                ticket.getTrip().getArrivalLocation(),
                ticket.getTrip().getDepartureTime(),
                ticket.getTrip().getArrivalTime()
        );
    }

    @Override
    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }
}
