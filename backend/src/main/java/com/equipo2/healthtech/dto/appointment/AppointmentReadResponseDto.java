package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentReadResponseDto(
        Long id,
        Long patientId,
        UserProfileReadSummaryResponseDto patientProfile,
        List<Long> practitionerIds,
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        AppointmentPriority priority,
        AppointmentStatus status,
        String teleconsultationUrl
) { }