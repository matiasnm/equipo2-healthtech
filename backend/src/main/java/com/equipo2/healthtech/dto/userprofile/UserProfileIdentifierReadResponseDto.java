package com.equipo2.healthtech.dto.userprofile;

import com.equipo2.healthtech.model.userProfile.IdentifierType;

public record UserProfileIdentifierReadResponseDto(
        Long id,
        String system,
        String value,
        IdentifierType type,
        Long userProfileId
) { }
