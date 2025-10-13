package com.equipo2.healthtech.dto.appointment;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentUpdateRequestDto(
        @NotNull(message = "Patient ID is required")
        Long patientId,

        @NotNull(message = "At least one practitioner is required")
        List<Long> practitionerIds,

        @NotNull(message = "Incomplete attribute: 'startTime'")
        OffsetDateTime startTime,

        @NotNull(message = "Incomplete attribute: 'endTime'")
        OffsetDateTime endTime
) { }