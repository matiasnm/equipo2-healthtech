package com.equipo2.healthtech.dto.patient;

public record PatientFindByRequestDto (
    String fullName,
    String identifierValue,
    Boolean summary
) { }
