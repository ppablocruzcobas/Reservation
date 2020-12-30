package com.isu.reservation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({ "/reservations", "/reservation", "/contacts", "/contact" })
    public String index() {
        return "forward:/index.html";
    }
}
