package com.equipo2.healthtech.dto.login;

import com.equipo2.healthtech.dto.user.UserReadResponseDto;

public record LoginWithUserResponseDto(
    LoginResponseDto login,
    UserReadResponseDto user
) {}