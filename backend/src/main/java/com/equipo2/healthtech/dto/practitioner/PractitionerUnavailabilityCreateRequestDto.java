package com.equipo2.healthtech.dto.practitioner;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetTime;

public record PractitionerUnavailabilityCreateRequestDto(
        @NotNull(message = "Incomplete atribute 'dayOfWeek'") Integer dayOfWeek,
        @NotNull(message = "Incomplete atribute 'startTime'") OffsetTime startTime,
        @NotNull(message = "Incomplete atribute 'endTime'") OffsetTime endTime
        ) { }