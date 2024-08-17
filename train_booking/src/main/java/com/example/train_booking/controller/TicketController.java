package com.example.train_booking.controller;

import com.example.train_booking.dto.TicketDTO;
import com.example.train_booking.entity.Ticket;
import com.example.train_booking.service.Impl.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;
    @GetMapping("/get-ticket/{id}")
    public ResponseEntity<?> getAllTicketByTripId(@PathVariable Integer id){
        List<TicketDTO> ticketDTOSs = ticketService.getAllTicketByTripId(id);
        if (ticketDTOSs == null || ticketDTOSs.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(ticketDTOSs);
        }
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getTicketsByUserId(@PathVariable Integer id){
        List<TicketDTO> tickets = ticketService.getAllTicketByUserId(id);
        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tickets);
    }
    @GetMapping("/user-ticket-detail/{id}")
    public ResponseEntity<?> getTicketsDetail(@PathVariable Integer id){
        TicketDTO ticketDTO = ticketService.findTicketDTOById(id);
        if (ticketDTO == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ticketDTO);
    }
}
