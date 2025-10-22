package com.equipo2.healthtech.dto.relatedperson;

import com.equipo2.healthtech.model.userProfile.RelatedPersonType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RelatedPersonCreateRequestDto(
        @NotNull(message = "Incomplete attribute: 'type'") RelatedPersonType type,
        @NotBlank(message = "Incomplete attribute: 'fullName'") String fullName,
        @NotBlank(message = "Incomplete attribute: 'phone'") String phone,
        String email,
        String address
) { }