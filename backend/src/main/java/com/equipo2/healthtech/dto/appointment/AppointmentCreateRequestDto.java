package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentCreateRequestDto(

        @NotNull(message = "Patient ID is required")
        Long patientId,

        @NotNull(message = "At least one practitioner is required")
        List<Long> practitionerIds,

        AppointmentPriority priority,

        @NotNull(message = "Incomplete attribute: 'startTime'")
        OffsetDateTime startTime,

        @NotNull(message = "Incomplete attribute: 'endTime'")
        OffsetDateTime endTime
) { }