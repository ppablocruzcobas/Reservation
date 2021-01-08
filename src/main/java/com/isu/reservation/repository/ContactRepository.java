package com.isu.reservation.repository;

import com.isu.reservation.model.Contact;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Default CRUD repository which already has some methods implemented.
// It's better to extend it, otherwise all operations need to be implemented.

@Repository
public interface ContactRepository extends CrudRepository<Contact, Long> {
}
