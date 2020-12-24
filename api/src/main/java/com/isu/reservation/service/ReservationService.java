package com.isu.reservation.service;

import java.util.ArrayList;
import java.util.List;

import com.isu.reservation.model.Reservation;
import com.isu.reservation.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    public List<Reservation> reservations() {
        Iterable<Reservation> it = reservationRepository.findAll();
        List<Reservation> reservations = new ArrayList<Reservation>();

        it.forEach(e -> reservations.add(e));

        return reservations;
    }

    @Transactional
    public void save(Reservation reservation) {
        reservationRepository.save(reservation);
    }
}
