package com.ayurgyan.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Public endpoint is working!");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        response.put("status", "SUCCESS");
        return response;
    }

    @PostMapping("/echo")
    public Map<String, Object> echoEndpoint(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Request received successfully");
        response.put("received_data", request);
        response.put("timestamp", System.currentTimeMillis());
        response.put("status", "SUCCESS");
        return response;
    }

    @GetMapping("/security-test")
    public Map<String, String> securityTest() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Security test endpoint - if you see this, security is working!");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }
}