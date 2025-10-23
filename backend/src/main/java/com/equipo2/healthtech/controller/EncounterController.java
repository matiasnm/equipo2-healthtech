package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.appointment.AppointmentReadDetailResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadResponseDto;
import com.equipo2.healthtech.dto.encounter.EncounterCreateRequestDto;
import com.equipo2.healthtech.dto.encounter.EncounterReadResponseDto;
import com.equipo2.healthtech.dto.encounter.EncounterUpdateRequestDto;
import com.equipo2.healthtech.service.EncounterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/encounters")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
public class EncounterController {

    // Accounts?
    // Campo para ordenar appoinments por prioridad?
    // Como llevar a cabo notificaciones?
    // Login con google? mfa?
    // integrar google meet?

    private final EncounterService encounterService;

    @Operation(summary = "Creates an Encounter")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERADMIN', 'PRACTITIONER')")
    @PostMapping("/create")
    ResponseEntity<EncounterReadResponseDto> createEncounter(@Valid @RequestBody EncounterCreateRequestDto request, UriComponentsBuilder uriBuilder) {
        Long id = encounterService.create(request);
        EncounterReadResponseDto dto = encounterService.read(id);
        URI location = uriBuilder.path("/encounters/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    @Operation(summary = "Reads an Encounter by Id")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    ResponseEntity<EncounterReadResponseDto> readEncounter(@PathVariable Long id) {
        return ResponseEntity.ok(encounterService.read(id));
    }

    @Operation(summary = "Lists all Encounters for this Authenticated User")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list}")
    ResponseEntity<Page<EncounterReadResponseDto>> readAllEncounter(
            @ParameterObject
            @PageableDefault(page = 0, size = 10, sort = "encounter.encounterStatus")
            Pageable pageable) {
        Page<EncounterReadResponseDto> result = encounterService.readAll(pageable);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Updates an Encounter")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERADMIN','PATIENT', 'PRACTITIONER')")
    @PutMapping("update/{id}")
    ResponseEntity<Void> updateEncounter(@PathVariable Long id, @Valid @RequestBody EncounterUpdateRequestDto request) {
        encounterService.update(id, request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Deletes an Encounter")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERADMIN')")
    @PutMapping("/{id}")
    ResponseEntity<Void> deleteEncounter(@PathVariable Long id) {
        encounterService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
