package com.example.train_booking.repository;

import com.example.train_booking.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Integer> {
    List<Ticket> findAllByTripId(Integer id);
}
