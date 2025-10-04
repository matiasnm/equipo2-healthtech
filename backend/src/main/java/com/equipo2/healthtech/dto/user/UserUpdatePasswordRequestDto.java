package com.equipo2.healthtech.dto.user;

import jakarta.validation.constraints.NotBlank;

public record UserUpdatePasswordRequestDto(
        @NotBlank String oldPassword,
        @NotBlank String newPassword
) { }