package com.example.train_booking.service.Impl;

import com.example.train_booking.entity.Bus;
import com.example.train_booking.repository.BusRepository;
import com.example.train_booking.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BusServive implements BusService {
    @Autowired
    private BusRepository busRepository;
    @Override
    public List<Bus> getAllBus(String licensePlate) {
        return busRepository.getAllByLicensePlateContaining(licensePlate);
    }

    @Override
    public Bus saveBus(Bus bus) {
        return busRepository.save(bus);
    }
}
