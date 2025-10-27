package com.equipo2.healthtech.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
@Tag(name = "9\uFE0F⃣ Test")
public class TestController {

    @GetMapping
    public String hello() {
        return "✅ HealthTech app is running!";
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @Operation(summary = "Gets a response if authenticated and Role=ADMIN")
    @SecurityRequirement(name = "bearer-key")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Hello Admin!";
    }

    @Operation(summary = "Gets a response if authenticated")
    @SecurityRequirement(name = "bearer-key")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public String userEndpoint() {
        return "Hello Authenticated User!";
    }

}