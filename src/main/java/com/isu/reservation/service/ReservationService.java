package com.isu.reservation.service;

import java.util.ArrayList;
import java.util.List;

import com.isu.reservation.model.Contact;
import com.isu.reservation.model.Reservation;
import com.isu.reservation.repository.ContactRepository;
import com.isu.reservation.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Service to perform CRUD operations with the Reservation model

@Service
public class ReservationService {

  @Autowired
  ReservationRepository reservationRepository;

  @Autowired
  ContactRepository contactRepository;

  public List<Reservation> reservations() {
    Iterable<Reservation> it = reservationRepository.findAll();
    List<Reservation> reservations = new ArrayList<Reservation>();

    it.forEach(e -> reservations.add(e));

    return reservations;
  }

  public Reservation find(Long id) {
    return reservationRepository.findById(id).get();
  }

  @Transactional
  public Reservation save(Reservation reservation) {
    if (reservation.getContact().getId() == null) {
      Contact contact = contactRepository.save(reservation.getContact());
      reservation.setContact(contact);
    }
    return reservationRepository.save(reservation);
  }

  @Transactional
  public Contact update(Reservation reservation) {
    return save(reservation).getContact();
  }

}
