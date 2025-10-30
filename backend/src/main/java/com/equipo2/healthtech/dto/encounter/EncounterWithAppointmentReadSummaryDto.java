package com.equipo2.healthtech.dto.encounter;

import com.equipo2.healthtech.dto.appointment.AppointmentReadSummaryResponseDto;

public record EncounterWithAppointmentReadSummaryDto(
    Long id,
    AppointmentReadSummaryResponseDto appointment
) { }
