package com.isu.reservation.controller;

import java.util.ArrayList;
import java.util.List;

import com.isu.reservation.model.Contact;
import com.isu.reservation.model.Reservation;
import com.isu.reservation.service.ReservationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReservationController {

  @Autowired
  private ReservationService reservationService;

  @GetMapping("/reservations")
  public ResponseEntity<?> getAllReservations() {
    List<Reservation> reservations = new ArrayList<Reservation>();
    try {
      reservations = reservationService.reservations();
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.ok(reservations);
  }

  @GetMapping("/reservation/{id}")
  public ResponseEntity<?> findReservation(@PathVariable("id") Long id) {
    Reservation reservation = new Reservation();
    try {
      reservation = reservationService.find(id);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.ok(reservation);
  }

  @PostMapping("/reservation")
  public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
    Reservation createdReservation = new Reservation();
    try {
      createdReservation = reservationService.save(reservation);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.ok(createdReservation.getContact());
  }

  @PutMapping("/reservation")
  public ResponseEntity<?> editReservation(@RequestBody Reservation reservation) {
    Contact contact = new Contact();
    try {
      contact = reservationService.update(reservation);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
    return ResponseEntity.ok(contact);
  }

}
