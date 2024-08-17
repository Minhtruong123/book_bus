package com.example.train_booking.entity;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingRequest {
    private List<Integer> listId;
    private String username;
}
