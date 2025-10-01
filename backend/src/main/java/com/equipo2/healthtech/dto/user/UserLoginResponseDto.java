package com.equipo2.healthtech.dto.user;

public record UserLoginResponseDto(
        String token,
        String refreshToken,
        boolean mfaRequired
) { }