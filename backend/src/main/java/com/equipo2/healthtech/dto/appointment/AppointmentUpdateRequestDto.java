package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentUpdateRequestDto(
        @NotNull(message = "Patient ID is required")
        Long patientId,

        @NotNull(message = "At least one practitioner is required")
        List<Long> practitionerIds,

        AppointmentPriority priority,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
        @NotNull(message = "Incomplete attribute: 'startTime'")
        OffsetDateTime startTime,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
        @NotNull(message = "Incomplete attribute: 'endTime'")
        OffsetDateTime endTime
) { }