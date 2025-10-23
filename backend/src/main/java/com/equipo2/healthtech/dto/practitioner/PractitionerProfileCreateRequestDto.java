package com.equipo2.healthtech.dto.practitioner;

import com.equipo2.healthtech.util.ValidOfficeCode;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PractitionerProfileCreateRequestDto(
        @NotNull(message = "Incomplete atribute 'experience'")
        Integer experience,

        @NotNull(message = "Incomplete atribute 'studies'")
        String studies,

        @NotNull(message = "Incomplete attribute 'officeCode'")
        @Size(min = 2, max = 2, message = "Office code must be exactly 2 characters long")
        @ValidOfficeCode
        String officeCode,

        @NotNull(message = "Incomplete atribute 'remote'")
        Boolean remote
) { }
