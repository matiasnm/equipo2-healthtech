package com.equipo2.healthtech.dto.practitioner;

import com.equipo2.healthtech.dto.CodeableConceptReadDto;

public record PractitionerRoleReadResponseDto(
        CodeableConceptReadDto roleCode,
        CodeableConceptReadDto specialityCode
) { }