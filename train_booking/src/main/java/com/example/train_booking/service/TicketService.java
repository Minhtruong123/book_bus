package com.example.train_booking.service;

import com.example.train_booking.dto.TicketDTO;
import com.example.train_booking.entity.Ticket;

import java.util.List;

public interface TicketService {
    List<TicketDTO> getAllTicket();
    List<TicketDTO> getAllTicketByTripId(Integer id);
    List<TicketDTO> getAllTicketByUserId(Integer userId);
    Ticket findById(Integer id);
    TicketDTO findTicketDTOById(Integer id);
    Ticket saveTicket(Ticket ticket);
}
