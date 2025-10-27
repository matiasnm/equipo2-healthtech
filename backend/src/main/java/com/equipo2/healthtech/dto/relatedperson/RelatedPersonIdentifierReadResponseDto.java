package com.equipo2.healthtech.dto.relatedperson;

import com.equipo2.healthtech.model.userProfile.IdentifierType;

public record RelatedPersonIdentifierReadResponseDto(
        Long id,
        String system,
        String value,
        IdentifierType type,
        Long relatedPersonId
) { }
