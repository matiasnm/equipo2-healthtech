package com.equipo2.healthtech.dto.practitioner;

public record CodeableConceptReadDto(
        String system,
        Long code,
        String display,
        String definition
) { }