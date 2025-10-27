package com.equipo2.healthtech.dto;

public record CodeableConceptReadDto(
        String system,
        String code,
        String display,
        String definition
) { }