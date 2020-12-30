package com.isu.reservation.controller;

import java.util.List;

import com.isu.reservation.model.Reservation;
import com.isu.reservation.service.ReservationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservations")
    public @ResponseBody List<Reservation> getAllReservations() {
        return reservationService.reservations();
    }

    @PostMapping("/reservation")
    public @ResponseBody String createReservation(@RequestBody Reservation reservation) {
        reservationService.save(reservation);
        return "Reservation created.";
    }
}
