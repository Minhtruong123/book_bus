INSERT INTO bus (license_plate, `type`, capacity)
VALUES
  ('ABC-123', 'Thuong', 50),
  ('DEF-456', 'Limousine', 40),
  ('GHI-789', 'Thuong', 30),
  ('JKL-101', 'Thuong', 60),
  ('MNO-202', 'Limousine', 35),
  ('PQR-303', 'Limousine bay', 45),
  ('STU-404', 'Limousine', 50),
  ('VWX-505', 'Thuong', 40),
  ('YZ-606', 'Thuong', 30)
;

INSERT INTO trip (departure_location, arrival_location, departure_time, arrival_time, bus_id)
VALUES
  ('HaNoi', 'HoChiMinh', '2024-08-19 10:00:00', '2024-08-20 06:00:00', 1),
  ('DaNang', 'Hue', '2024-08-18 13:30:00', '2024-08-19 15:00:00', 2),
  ('HaiPhong', 'HaNoi', '2024-08-18 08:00:00', '2024-08-19 10:00:00', 3),
  ('Hue', 'DaLat', '2024-08-19 12:00:00', '2024-08-20 08:00:00', 4),
  ('NhaTrang', 'QuyNhon', '2024-08-19 14:00:00', '2024-08-19 17:00:00', 5),
  ('VungTau', 'HoChiMinh', '2024-08-20 09:00:00', '2024-08-20 11:00:00', 6),
  ('CanTho', 'PhuQuoc', '2024-08-20 14:00:00', '2024-08-21 08:00:00', 9)
;

INSERT INTO booking (booking_date, user_id)
VALUES
  ('2024-08-13 12:00:00', 1),
  ('2024-08-14 10:30:00', 2),
  ('2024-08-16 13:00:00', 2),
  ('2024-08-17 10:30:00', 1),
  ('2024-08-18 15:00:00', 3),
  ('2024-08-19 09:30:00', 2),
  ('2024-08-20 11:00:00', 1),
  ('2024-08-21 14:00:00', 3), 
  ('2024-08-22 11:30:00', 1),  
  ('2024-08-23 16:00:00', 2)  
;


INSERT INTO ticket (seat_number, price, booked, trip_id, booking_id)
VALUES
  ('A1', 150.0, false, 1, 5),
  ('A2', 180.0, false, 1, 7),
  ('A3', 120.0, false, 1, 4),
  ('A4', 180.0, false, 1, 8),
  ('A5', 160.0, false, 1, 3),
  ('2B', 130.0, false, 2, 6),
  ('3B', 190.0, false, 2, 9),
  ('1B', 140.0, false, 2, 10),
  ('4B', 170.0, false, 3, 1),
  ('5B', 150.0, false, 2, 2)
;


