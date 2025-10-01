package com.equipo2.healthtech.dto.user;

import jakarta.validation.constraints.NotBlank;

public record UserUpdateRequestDto(
        @NotBlank(message = "Incomplete attribute: 'email'") String email,
        @NotBlank(message = "Incomplete attribute: 'firstName'") String firstName,
        @NotBlank(message = "Incomplete attribute: 'lastName'") String lastName,
        @NotBlank(message = "Incomplete attribute: 'phone'") String phone
) { }