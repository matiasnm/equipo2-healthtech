package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patients")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
public class PatientController {

    private final PatientService patientService;

    @Operation(summary = "Assigns or updates the Patient’s General Practitioner")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','PATIENT')")
    @PutMapping("/{id}/general-practitioner")
    public void setGeneralPractitioner(@PathVariable Long id, Long practitionerId) {
        // @RequestParam(required = false) Long practitionerId -> may accept `null` in order to set generalPractitioner to `null`
        patientService.setGeneralPractitioner(id, practitionerId);
    }

}