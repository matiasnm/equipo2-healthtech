package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.model.appointment.AppointmentStatus;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentReadResponseDto(
        Long id,
        Long patientId,
        List<Long> practitionerIds,
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        AppointmentStatus status,
        String teleconsultationUrl
) { }