package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.login.LoginRequestDto;
import com.equipo2.healthtech.dto.login.LoginResponseDto;
import com.equipo2.healthtech.dto.login.MfaVerificationRequestDto;
import com.equipo2.healthtech.exception.InvalidMfaCodeException;
import com.equipo2.healthtech.exception.MfaNotEnabledException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.security.JwtTokenService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserService userService;
    private final MfaService mfaService;

    @Override
    public LoginResponseDto login(@Valid LoginRequestDto request) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        var authUser = authenticationManager.authenticate(authToken);
        User user = (User) authUser.getPrincipal();

        boolean mfaEnabled = user.isMfaRequired();

        if (mfaEnabled) {
            // MFA required ! No token granted (we may create a "challenge token" to use on /mfa/verify)
            log.info("LOGIN -> REFUSED, MFA REQUIRED FOR User EMAIL: {}", user.getEmail());
            return new LoginResponseDto(null, null, true);
        }

        var jwtToken = jwtTokenService.createToken(user, true);
        var jwtRefreshToken = jwtTokenService.createRefreshToken(user);

        log.info("LOGIN -> User EMAIL: {} with Roles: {}", request.email(), authUser.getAuthorities());
        return new LoginResponseDto(jwtToken, jwtRefreshToken, false);
    }

    @Override
    public LoginResponseDto verifyMfa(@Valid MfaVerificationRequestDto request) {
        User user = userService.findUserByEmail(request.email())
                .orElseThrow(() -> NoResultsException.of(request.email()));

        if (user.getMfaSecret() == null || !user.isMfaRequired()) {
            throw MfaNotEnabledException.of(user.getEmail());
        }

        boolean validOtp = mfaService.verifyCode(user.getMfaSecret(), request.code());
        log.info("MOCK VALID OTP -> true");
        if (!validOtp) {
            throw InvalidMfaCodeException.of(user.getEmail());
        }
        String accessToken = jwtTokenService.createToken(user, true);
        String refreshToken = jwtTokenService.createRefreshToken(user);
        log.info("MFA verified -> User EMAIL: {} with Roles: {}", user.getEmail(), user.getRole());
        return new LoginResponseDto(accessToken, refreshToken, false);
    }
}
