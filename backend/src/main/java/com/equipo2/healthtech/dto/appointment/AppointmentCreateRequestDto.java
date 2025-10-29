package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentCreateRequestDto(

        @NotNull(message = "Patient ID is required")
        Long patientId,

        @NotNull(message = "At least one practitioner is required")
        List<Long> practitionerIds,

        AppointmentPriority priority,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
        @NotNull(message = "Incomplete attribute: 'startTime'")
        @Schema(
                description = "End date and time of the appointment (format: yyyy-MM-dd'T'HH:mmXXX)",
                example = "2025-10-29T16:21-03:00"
        )
        OffsetDateTime startTime,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mmXXX")
        @NotNull(message = "Incomplete attribute: 'endTime'")
        @Schema(
                description = "End date and time of the appointment (format: yyyy-MM-dd'T'HH:mmXXX)",
                example = "2025-10-29T16:21-03:00"
        )
        OffsetDateTime endTime
) { }