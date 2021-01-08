package com.isu.reservation.repository;

import com.isu.reservation.model.Reservation;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Default CRUD repository which already has some methods implemented.
// It's better to extend it, otherwise all operations need to be implemented.

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
