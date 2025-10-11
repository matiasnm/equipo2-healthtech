package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.service.PractitionerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/practitioners")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
public class PractitionerController {

    private final PractitionerRepository practitionerRepository;
    private final PractitionerService practitionerService;

    @Operation(summary = "Gets Practitioner by id")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<PractitionerReadResponseDto> getPractitioner(@PathVariable Long id) {
        return ResponseEntity.ok(practitionerService.read(id));
    }

    @Operation(summary = "Gets current Practitioner")
    @PreAuthorize("hasAnyRole('PRACTITIONER', 'ADMIN', 'SUPERADMIN')")
    @GetMapping("/me")
    public ResponseEntity<PractitionerReadResponseDto> getMe() {
        return ResponseEntity.ok(practitionerService.readMe());
    }

    @Operation(summary = "Sets the Practitioner Role")
    @PreAuthorize("hasAnyRole('PRACTITIONER', 'ADMIN', 'SUPERADMIN')")
    @PostMapping("/practitioner-roles/{id}")
    public ResponseEntity<PractitionerRoleReadResponseDto> createPractitionerRole(@PathVariable Long id, @RequestBody @Valid PractitionerRoleCreateRequestDto request) {
        return ResponseEntity.ok(practitionerService.createPractitionerRole(id, request));
    }

}
