package com.example.train_booking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String departureLocation;
    private String arrivalLocation;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Bus bus;
}
