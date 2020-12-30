package com.isu.reservation.controller;

import java.util.List;

import com.isu.reservation.model.Contact;
import com.isu.reservation.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/contacts")
    public @ResponseBody List<Contact> getAllContacts() {
        return contactService.contacts();
    }

    @PostMapping("/contact")
    public @ResponseBody Contact createContact(@RequestBody Contact contact) {
        return contactService.save(contact);
    }

    @PutMapping("/contact/{id}")
    public @ResponseBody String editContact(@PathVariable("id") Long id, @RequestBody Contact contact) {
        contactService.update(id, contact);
        return "Contact updated.";
    }

    @DeleteMapping("/contact/{id}")
    public @ResponseBody String delete(@PathVariable("id") Long id) {
        contactService.delete(id);
        return "Contact deleted.";
    }
}
