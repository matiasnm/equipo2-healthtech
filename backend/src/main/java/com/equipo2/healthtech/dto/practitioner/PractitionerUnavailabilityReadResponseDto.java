package com.equipo2.healthtech.dto.practitioner;

import java.time.DayOfWeek;
import java.time.OffsetTime;

public record PractitionerUnavailabilityReadResponseDto(
        DayOfWeek dayOfWeek,
        OffsetTime startTime,
        OffsetTime endTime
) { }