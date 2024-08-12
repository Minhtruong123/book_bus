package com.example.train_booking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String role;
    private String gmail;
    private String phoneNumber;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private Set<Booking> bookings;
}
