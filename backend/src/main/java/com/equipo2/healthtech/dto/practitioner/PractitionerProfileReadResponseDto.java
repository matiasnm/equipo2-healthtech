package com.equipo2.healthtech.dto.practitioner;

public record PractitionerProfileReadResponseDto(
        Integer experience,
        String studies,
        String officeCode,
        boolean remote
) { }