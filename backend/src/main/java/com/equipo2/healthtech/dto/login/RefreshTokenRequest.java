package com.equipo2.healthtech.dto.login;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequest(
        @NotBlank(message = "Incomplete attribute: 'refreshToken'") String refreshToken
) { }