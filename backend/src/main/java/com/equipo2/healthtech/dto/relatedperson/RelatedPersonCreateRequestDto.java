package com.equipo2.healthtech.dto.relatedperson;

import com.equipo2.healthtech.model.user.RelatedPersonType;
import com.equipo2.healthtech.model.user.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RelatedPersonCreateRequestDto(
        @NotNull(message = "Incomplete attribute: 'type'") RelatedPersonType type,
        @NotBlank(message = "Incomplete attribute: 'fullName'") String fullName,
        @NotBlank(message = "Incomplete attribute: 'phone'") String phone,
        String email,
        String address
) { }