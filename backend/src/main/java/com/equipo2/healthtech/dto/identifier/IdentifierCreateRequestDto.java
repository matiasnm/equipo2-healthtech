package com.equipo2.healthtech.dto.identifier;

import com.equipo2.healthtech.model.user.IdentifierType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record IdentifierCreateRequestDto(
        @NotBlank
        @Size(max = 255)
        String system,

        @NotBlank
        @Size(max = 255)
        String value,

        @NotNull
        IdentifierType type
) { }
