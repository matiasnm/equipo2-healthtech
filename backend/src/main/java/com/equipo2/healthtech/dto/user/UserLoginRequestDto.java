package com.equipo2.healthtech.dto.user;

import jakarta.validation.constraints.NotBlank;

public record UserLoginRequestDto(
    @NotBlank(message = "Incomplete attribute: 'email'") String email,
    @NotBlank(message = "Incomplete attribute: 'password'") String password
) { }
