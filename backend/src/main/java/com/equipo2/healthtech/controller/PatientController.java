package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.patient.PatientFindByRequestDto;
import com.equipo2.healthtech.dto.patient.PatientFindByResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patients")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
@Tag(name = "4️⃣ Patients")
public class PatientController {

    private final PatientService patientService;

    @Operation(summary = "Assigns or updates the Patient’s General Practitioner")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','PATIENT')")
    @PutMapping("/{id}/general-practitioner")
    public void setGeneralPractitioner(@PathVariable Long id, Long practitionerId) {
        // @RequestParam(required = false) Long practitionerId -> may accept `null` in order to set generalPractitioner to `null`
        patientService.setGeneralPractitioner(id, practitionerId);
    }

    @Operation(summary = "Find Patients by FullName and/or Identifier value. If summary = false, returns a full details profile")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','PRACTITIONER')")
    @GetMapping("/find-patients")
    public ResponseEntity<Page<PatientFindByResponseDto>> findByDto(PatientFindByRequestDto request, Pageable pageable) {
        return ResponseEntity.ok(patientService.findByDto(request, pageable));
    }

    @Operation(summary = "Gets my Practitioners")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','PATIENT')")
    @GetMapping("/my-practitioners")
    public ResponseEntity<Page<PractitionerReadSummaryResponseDto>> getMyPractitioners(Pageable pageable) {
        return ResponseEntity.ok(patientService.getMyPractitioners(pageable));
    }
}