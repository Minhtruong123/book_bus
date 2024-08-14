package com.example.train_booking.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class TicketDTO {
    private Integer id;
    private String seatNumber;
    private Double price;
    private Boolean booked;

    private String departureLocation;
    private String arrivalLocation;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    public TicketDTO(Integer id, String seatNumber, Double price, Boolean booked,
                     String departureLocation, String arrivalLocation,
                     LocalDateTime departureTime, LocalDateTime arrivalTime) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.price = price;
        this.booked = booked;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
    }
}
