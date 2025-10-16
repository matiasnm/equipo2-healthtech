package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;
import com.equipo2.healthtech.service.ClinicService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/clinic")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
public class ClinicController {

    private final ClinicService clinicService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ClinicReadResponseDto> getClinic() {
        ClinicReadResponseDto dto = clinicService.read(1L);
        return ResponseEntity.ok(dto);

    }
}
