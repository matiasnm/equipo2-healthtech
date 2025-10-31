package com.equipo2.healthtech.dto.practitioner;

public record TimeRangeReadDto(
        String startTime, // e.g. "2025-10-28T09:00-03:00"
        String endTime,   // e.g. "2025-10-28T09:30-03:00"
        String source     // "APPOINTMENT" or "UNAVAILABILITY"
) {}