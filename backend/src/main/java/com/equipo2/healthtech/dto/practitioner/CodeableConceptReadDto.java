package com.equipo2.healthtech.dto.practitioner;

public record CodeableConceptReadDto(
        String system,
        String code,
        String display,
        String definition
) { }