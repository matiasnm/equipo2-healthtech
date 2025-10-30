package com.equipo2.healthtech.dto.encounter;

import com.equipo2.healthtech.dto.CodeableConceptReadDto;
import com.equipo2.healthtech.model.encounter.EncounterClass;
import com.equipo2.healthtech.model.encounter.EncounterStatus;

public record EncounterReadResponseDto(
        Long id,
        EncounterStatus encounterStatus,
        EncounterClass encounterClass,
        CodeableConceptReadDto reason,
        CodeableConceptReadDto diagnosis,
        Long patientId,
        Long appointmentId,
        String notes
) { }