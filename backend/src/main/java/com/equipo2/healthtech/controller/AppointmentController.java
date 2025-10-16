package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.appointment.AppointmentAvailabilityRequestDto;
import com.equipo2.healthtech.dto.appointment.AppointmentCreateRequestDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadDetailResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentUpdateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import com.equipo2.healthtech.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentReadDetailResponseDto> getAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.read(id));
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
        boolean available = appointmentService.isPractitionerAvailable(id, request.startTime(), request.endTime());
        return ResponseEntity.ok(available);
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

}