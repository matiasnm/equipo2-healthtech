package com.equipo2.healthtech.dto.appointment;

import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import jakarta.validation.constraints.NotNull;

public record AppointmentUpdateStatusRequestDto(
        @NotNull(message = "Incomplete attribute: 'status'") AppointmentStatus status
) { }
