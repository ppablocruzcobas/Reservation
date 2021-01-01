package com.isu.reservation.controller;

import java.util.ArrayList;
import java.util.List;

import com.isu.reservation.model.Contact;
import com.isu.reservation.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/contacts")
    public ResponseEntity<?> getAllContacts() {
        List<Contact> contacts = new ArrayList<Contact>();
        try {
            contacts = contactService.contacts();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(contacts);
    }

    @PostMapping("/contact")
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        try {
            contactService.save(contact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Contact Created.");
    }

    @GetMapping("/contact/{id}")
    public ResponseEntity<?> findContact(@PathVariable("id") Long id) {
        Contact contact = new Contact();
        try {
            contact = contactService.find(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(contact);
    }

    @PutMapping("/contact")
    public ResponseEntity<String> editContact(@RequestBody Contact contact) {
        try {
            contactService.update(contact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Contact Updated.");
    }

    @DeleteMapping("/contact/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        try {
            contactService.delete(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Contact Deleted.");
    }
}
