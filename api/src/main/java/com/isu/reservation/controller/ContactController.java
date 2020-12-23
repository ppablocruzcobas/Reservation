package com.isu.reservation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @RequestMapping(value = "/contacts", method = RequestMethod.GET)
    public @ResponseBody String getAllContacts() {
        return "get all contacts";
    }

    @RequestMapping(value = "/contact/add", method = RequestMethod.POST)
    public @ResponseBody String addContact() {
        return "create contact";
    }

    @RequestMapping(value = "/contact/edit", method = RequestMethod.PUT)
    public @ResponseBody String editContact() {
        return "create contact";
    }

    @RequestMapping(value = "/contact/delete", method = RequestMethod.DELETE)
    public @ResponseBody String deleteContact() {
        return "create contact";
    }

}
