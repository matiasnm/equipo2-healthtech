package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.login.*;

public interface LoginService {

    public LoginWithUserResponseDto login(LoginRequestDto request);

    public LoginResponseDto verifyMfa(MfaVerificationRequestDto request);
    public LoginResponseDto refreshToken(RefreshTokenRequest request);
}
