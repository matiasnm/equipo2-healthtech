package com.equipo2.healthtech.dto.practitioner;

import java.time.OffsetTime;

public record PractitionerUnavailabilityReadResponseDto(
        Integer dayOfWeek,
        OffsetTime startTime,
        OffsetTime endTime
) { }