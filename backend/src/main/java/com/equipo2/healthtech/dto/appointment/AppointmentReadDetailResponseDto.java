package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentReadDetailResponseDto(
        Long id,
        UserProfileReadSummaryResponseDto patientProfile,
        List<PractitionerReadSummaryResponseDto> practitioners,
        AppointmentPriority priority,
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        AppointmentStatus status,
        String teleconsultationUrl
) { }