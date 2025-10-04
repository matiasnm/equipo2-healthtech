package com.equipo2.healthtech.dto.user;

import com.equipo2.healthtech.model.user.IdentifierType;

public record UserIdentifierReadResponseDto(
        String system,
        String value,
        IdentifierType type,
        Long userId
) { }
