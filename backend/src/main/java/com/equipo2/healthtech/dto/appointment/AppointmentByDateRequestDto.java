package com.equipo2.healthtech.dto.appointment;

import java.time.OffsetDateTime;

public record AppointmentByDateRequestDto(
        OffsetDateTime startTime,
        OffsetDateTime endTime
) { }