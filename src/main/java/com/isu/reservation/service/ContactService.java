package com.isu.reservation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.isu.reservation.model.Contact;
import com.isu.reservation.repository.ContactRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

  @Autowired
  ContactRepository contactRepository;

  public List<Contact> contacts() {
    Iterable<Contact> it = contactRepository.findAll();
    List<Contact> contacts = new ArrayList<Contact>();

    it.forEach(e -> contacts.add(e));

    return contacts;
  }

  public Contact find(Long id) {
    return contactRepository.findById(id).get();
  }

  @Transactional
  public Contact save(Contact contact) {
    return contactRepository.save(contact);
  }

  @Transactional
  public Contact update(Contact contact) {
    return save(contact);
  }

  @Transactional
  public void delete(Long id) {
    contactRepository.deleteById(id);
  }
}
