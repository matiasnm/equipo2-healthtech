package com.equipo2.healthtech.dto.user;

import com.equipo2.healthtech.model.user.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserCreateRequestDto(
        @NotBlank(message = "Incomplete attribute: 'email'") String email,
        @NotNull(message = "Incomplete attribute: 'role'") Role role,
        @NotBlank(message = "Incomplete attribute: 'password'") String password
) { }