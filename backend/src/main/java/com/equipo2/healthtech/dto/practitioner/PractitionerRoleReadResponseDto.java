package com.equipo2.healthtech.dto.practitioner;

public record PractitionerRoleReadResponseDto(
        CodeableConceptReadDto roleCode,
        CodeableConceptReadDto specialityCode
) { }