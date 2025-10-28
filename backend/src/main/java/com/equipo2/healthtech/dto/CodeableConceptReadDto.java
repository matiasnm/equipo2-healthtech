package com.equipo2.healthtech.dto;

public record CodeableConceptReadDto(
        Long id,
        String system,
        String code,
        String display,
        String definition
) { }