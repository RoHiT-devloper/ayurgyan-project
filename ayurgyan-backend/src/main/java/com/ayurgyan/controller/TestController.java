package com.ayurgyan.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @GetMapping("/cors")
    public String testCors() {
        return "CORS is working!";
    }
}