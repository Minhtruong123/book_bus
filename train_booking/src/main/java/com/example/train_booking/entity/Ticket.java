package com.example.train_booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String seatNumber;
    private Double price;
    private Boolean booked =false;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Trip trip;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Booking booking;
}
