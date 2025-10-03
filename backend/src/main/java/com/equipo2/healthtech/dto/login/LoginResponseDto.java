package com.equipo2.healthtech.dto.login;

public record LoginResponseDto(
        String token,
        String refreshToken,
        boolean mfaRequired
) { }