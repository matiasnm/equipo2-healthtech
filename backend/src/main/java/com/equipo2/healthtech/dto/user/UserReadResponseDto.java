package com.equipo2.healthtech.dto.user;

import com.equipo2.healthtech.model.user.Role;

public record UserReadResponseDto(
        String email,
        String firstName,
        String lastName,
        String phone,
        Role role,
        Long clinicId
) { }
