package com.equipo2.healthtech.dto.appointment;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record AppointmentAvailabilityRequestDto(
        @NotNull OffsetDateTime startTime,
        @NotNull OffsetDateTime endTime
) { }