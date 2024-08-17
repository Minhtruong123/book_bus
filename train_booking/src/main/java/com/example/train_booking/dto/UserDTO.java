package com.example.train_booking.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String username;
    private String gmail;
    private String role;
    private String phoneNumber;
}
