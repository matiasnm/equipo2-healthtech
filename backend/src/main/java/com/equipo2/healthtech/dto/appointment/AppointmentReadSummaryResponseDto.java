package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;

import java.time.OffsetDateTime;
import java.util.List;

public record AppointmentReadSummaryResponseDto(
        Long id,
        List<PractitionerReadSummaryResponseDto> practitioners,
        OffsetDateTime startTime,
        OffsetDateTime endTime,
        AppointmentPriority priority,
        AppointmentStatus status
) { }