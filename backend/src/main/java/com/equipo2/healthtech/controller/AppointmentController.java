package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.appointment.*;
import com.equipo2.healthtech.dto.encounter.EncounterReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerWeeklyScheduleDto;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.service.AppointmentService;
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
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
@Tag(name = "6️⃣ Appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Operation(summary = "Creates an Appointment")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    ResponseEntity<AppointmentReadDetailResponseDto> createAppointment(@Valid @RequestBody AppointmentCreateRequestDto request, UriComponentsBuilder uriBuilder) {
        Long id = appointmentService.create(request);
        AppointmentReadDetailResponseDto dto = appointmentService.read(id);
        URI location = uriBuilder.path("/appointments/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).body(dto);
    };

    @Operation(summary = "Gets an Appointment by id")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentReadDetailResponseDto> getAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.read(id));
    }

    @Operation(summary = "Gets the Encounter related with Appointment by id")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}/encounter")
    public ResponseEntity<EncounterReadResponseDto> getEncounterFromAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.fetchEncounter(id));
    }

    @Operation(summary = "Lists all Appointment for this Authenticated User")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list")
    public ResponseEntity<Page<AppointmentReadResponseDto>> readAllAppointment(
            @ParameterObject
            @PageableDefault(page = 0, size = 10, sort = "patient.userProfile.fullName")
            Pageable pageable) {
        return ResponseEntity.ok(appointmentService.readAll(pageable));
    }

    @Operation(summary = "Lists all Appointment for this Authenticated User by Date")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list/by-date")
    public ResponseEntity<List<AppointmentReadResponseDto>> readAllAppointment(
            @ParameterObject
            @PageableDefault(page = 0, size = 10, sort = "patient.userProfile.fullName")
            AppointmentByDateRequestDto request) {
        return ResponseEntity.ok(appointmentService.readAllByDate(request));
    }

    @Operation(summary = "Updates an Appointment")
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateAppointment(@PathVariable Long id, @RequestBody @Valid AppointmentUpdateRequestDto request) {
        appointmentService.update(id, request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Changes an appointment Status")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERADMIN','PATIENT', 'PRACTITIONER')")
    @PutMapping("/update/status/{id}/{status}")
    public ResponseEntity<Void> updateAppointmentStatus(
            @PathVariable Long id,
            @PathVariable AppointmentStatus status) {
        appointmentService.updateStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Check if a specific practitioner is available in a time range")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/available-practitioners/{id}")
    public ResponseEntity<Boolean> isPractitionerAvailable(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentAvailabilityRequestDto request) {
        Practitioner practitioner = appointmentService.findAvailablePractitioner(id, request.startTime(), request.endTime());
        return ResponseEntity.ok(practitioner.isStatus());
    }

    @Operation(summary = "Returns current and next week practitioner unavailable time slots")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/available-practitioners/weekly/{id}")
    public ResponseEntity<PractitionerWeeklyScheduleDto> practitionerWeeklyUnavailability(
            @PathVariable Long id) {
        PractitionerWeeklyScheduleDto dto = appointmentService.getPractitionerWeeklyUnavailability(id);
        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "Get ALL available practitioners upon Dto (dates/remote/speciality)")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/available-practitioners")
    public ResponseEntity<List<PractitionerReadSummaryResponseDto>> getAvailablePractitioners(
            @Valid @RequestBody AppointmentAvailabilityRequestDto request) {
        List<PractitionerReadSummaryResponseDto> available =
                appointmentService.getAvailablePractitioners(request);
        return ResponseEntity.ok(available);
    }

    @Operation(summary = "Deletes an Appointment")
    @PreAuthorize("hasAnyRole('ADMIN','SUPERADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable Long id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Lists all Practitioner Roles available")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/available-practitioner-roles")
    public ResponseEntity<List<PractitionerRoleReadResponseDto>> getPractitionerRoles() {
        return ResponseEntity.ok(appointmentService.getAvailablePractitionerRoles());
    }

}