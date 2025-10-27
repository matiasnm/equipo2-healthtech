package com.equipo2.healthtech.dto.appointment;

import java.time.OffsetDateTime;

public record AppointmentAvailabilityRequestDto(
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        String specialityCode,
        Boolean remote
) { }