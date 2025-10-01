package com.equipo2.healthtech.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping
    public String hello() {
        return "✅ HealthTech app is running!";
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}