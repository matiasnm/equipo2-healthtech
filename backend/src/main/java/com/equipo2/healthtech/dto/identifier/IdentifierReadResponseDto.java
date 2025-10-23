package com.equipo2.healthtech.dto.identifier;

import com.equipo2.healthtech.model.userProfile.IdentifierType;

public record IdentifierReadResponseDto(
    Long id,
    String value,
    IdentifierType type
) { }
