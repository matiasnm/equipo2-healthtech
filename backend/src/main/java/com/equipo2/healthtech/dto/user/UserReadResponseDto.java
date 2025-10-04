package com.equipo2.healthtech.dto.user;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.model.user.Role;

public record UserReadResponseDto(
        Long id,
        String email,
        Role role,
        UserProfileReadResponseDto userProfile
) { }
