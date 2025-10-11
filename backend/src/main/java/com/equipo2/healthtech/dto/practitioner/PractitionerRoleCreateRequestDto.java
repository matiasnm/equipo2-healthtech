package com.equipo2.healthtech.dto.practitioner;

import jakarta.validation.constraints.NotNull;

public record PractitionerRoleCreateRequestDto(
        @NotNull(message = "Incomplete attribute: 'roleCodeId'") Long roleCodeId,
        @NotNull(message = "Incomplete attribute: 'specialityCodeId'") Long specialityCodeId
) { }