package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.login.LoginRequestDto;
import com.equipo2.healthtech.dto.login.LoginResponseDto;
import com.equipo2.healthtech.dto.login.MfaVerificationRequestDto;

public interface LoginService {

    public LoginResponseDto login(LoginRequestDto request);

    public LoginResponseDto verifyMfa(MfaVerificationRequestDto request);
}
