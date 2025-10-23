package com.equipo2.healthtech.dto.encounter;

import com.equipo2.healthtech.model.encounter.EncounterClass;
import com.equipo2.healthtech.model.encounter.EncounterStatus;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record EncounterCreateRequestDto(
        @NotNull(message = "Incomplete attribute: 'encounterStatus'") EncounterStatus encounterStatus,
        @NotNull(message = "Incomplete attribute: 'encounterClass'") EncounterClass encounterClass,
        Long reasonCodeId,
        Long diagnosisCodeId,
        @NotNull(message = "Appointment ID is required") Long appointmentId,
        @NotNull(message = "Patient ID is required") Long patientId,
        String notes
) { }