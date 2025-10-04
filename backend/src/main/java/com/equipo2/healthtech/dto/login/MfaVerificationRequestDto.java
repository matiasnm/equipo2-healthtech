package com.equipo2.healthtech.dto.login;

import jakarta.validation.constraints.NotBlank;

public record MfaVerificationRequestDto(
        @NotBlank(message = "Incomplete attribute: 'email'") String email,
        @NotBlank(message = "Incomplete attribute: 'code'") String code
) { }