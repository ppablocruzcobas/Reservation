package com.isu.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    /*
     * Redirect these routes to Angular application to manage the views.
     */
    @RequestMapping({ "/reservations", "/reservation", "/contact", "/contact/{id:\\w+}" })
    public String index() {
        return "forward:/index.html";
    }
}
