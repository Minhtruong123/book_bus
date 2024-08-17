package com.example.train_booking.controller;

import com.example.train_booking.dto.TicketDTO;
import com.example.train_booking.dto.UserDTO;
import com.example.train_booking.entity.Bus;
import com.example.train_booking.entity.Ticket;
import com.example.train_booking.entity.User;
import com.example.train_booking.service.Impl.BusServive;
import com.example.train_booking.service.Impl.TicketService;
import com.example.train_booking.service.Impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private BusServive busServive;
    @Autowired
    private TicketService ticketService;
    @GetMapping("/get-user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Integer id){
        try {
            UserDTO user = userService.findUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    @GetMapping("/get-users")
    public ResponseEntity<?> getAllUsers(@RequestParam(name = "username", required = false) String username) {
        List<UserDTO> users = userService.findAllUser(username);
        return ResponseEntity.ok(users);
    }
    @GetMapping("/get-buses")
    public ResponseEntity<?> getAllBuses(@RequestParam(name = "licensePlate", required = false) String licensePlate){
        List<Bus> buses = busServive.getAllBus(licensePlate);
        return ResponseEntity.ok(buses);
    }
    @GetMapping("/get-tickets")
    public ResponseEntity<?> getAllTickets(){
        List<TicketDTO> tickets = ticketService.getAllTicket();
        return ResponseEntity.ok(tickets);
    }
    @PostMapping("/add-bus")
    public ResponseEntity<?> addNewBus(@RequestBody Bus bus){
        Bus bus1 = busServive.saveBus(bus);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    @PatchMapping("/update-user/{id}")
    public ResponseEntity<?> patchUser(@PathVariable Integer id, @RequestBody User updateUser) {
        try {
            User updatedUser = userService.updateUser(updateUser,id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
