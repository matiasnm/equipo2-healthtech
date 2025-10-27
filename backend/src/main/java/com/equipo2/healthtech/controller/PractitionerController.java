package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.practitioner.*;
import com.equipo2.healthtech.service.PractitionerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/practitioners")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
@Tag(name = "3️⃣ Practitioners")
public class PractitionerController {

    private final PractitionerService practitionerService;

    @Operation(summary = "Gets all active/valid Practitioners")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list")
    public ResponseEntity<Page<PractitionerReadSummaryResponseDto>> readAllActive(
            @ParameterObject
            @PageableDefault(page = 0, size = 10, sort = "userProfile.fullName")
            Pageable pageable) {
        Page<PractitionerReadSummaryResponseDto> result = practitionerService.readAllActive(pageable);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Gets Practitioner by id")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<PractitionerReadResponseDto> read(@PathVariable Long id) {
        return ResponseEntity.ok(practitionerService.read(id));
    }

    @Operation(summary = "Gets current authenticated Practitioner")
    @PreAuthorize("hasAnyRole('PRACTITIONER', 'ADMIN', 'SUPERADMIN')")
    @GetMapping("/me")
    public ResponseEntity<PractitionerReadResponseDto> getMe() {
        return ResponseEntity.ok(practitionerService.readMe());
    }

    @Operation(summary = "Sets/Updates the Practitioner Role")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/practitioner-roles/{id}")
    public ResponseEntity<PractitionerRoleReadResponseDto> setPractitionerRole(@PathVariable Long id, @RequestBody @Valid PractitionerRoleCreateRequestDto request) {
        return ResponseEntity.ok(practitionerService.setPractitionerRole(id, request));
    }

    @Operation(summary = "Sets/Updates the Practitioner Profile")
    @PreAuthorize("hasAnyRole('PRACTITIONER', 'ADMIN', 'SUPERADMIN')")
    @PostMapping("/practitioner-roles/profile/{id}")
    public ResponseEntity<PractitionerProfileReadResponseDto> setPractitionerProfile(@PathVariable Long id, @RequestBody @Valid PractitionerProfileCreateRequestDto request) {
        return ResponseEntity.ok(practitionerService.setPractitionerProfile(id, request));
    }

    @Operation(summary = "Sets the Practitioner Availability")
    @PreAuthorize("hasAnyRole('PRACTITIONER', 'ADMIN', 'SUPERADMIN')")
    @PostMapping("/{id}/unavailability")
    public ResponseEntity<List<PractitionerUnavailabilityReadResponseDto>> setPractitionerProfile(
            @PathVariable Long id,
            @RequestBody @Valid List<PractitionerUnavailabilityCreateRequestDto> requests) {
        return ResponseEntity.ok(practitionerService.setPractitionerUnavailability(id, requests));
    }

}
