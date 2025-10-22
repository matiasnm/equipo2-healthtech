package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.login.*;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.exception.InvalidMfaCodeException;
import com.equipo2.healthtech.exception.MfaNotEnabledException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.security.JwtTokenService;
import com.equipo2.healthtech.security.SecurityUtils;
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
    private final SecurityUtils securityUtils;
    private final UserMapper userMapper;

    @Override
    public LoginWithUserResponseDto login(LoginRequestDto request) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        var authUser = authenticationManager.authenticate(authToken);
        User user = (User) authUser.getPrincipal();

        boolean mfaEnabled = user.isMfaRequired();

        if (mfaEnabled) {
            // MFA required ! No token granted (we may create a "challenge token" to use on /mfa/verify)
            log.info("LOGIN -> REFUSED, MFA REQUIRED FOR User EMAIL: {}", user.getEmail());
            LoginResponseDto loginDto = new LoginResponseDto(null, null, false);
            return new LoginWithUserResponseDto(loginDto, null);
        }

        var jwtToken = jwtTokenService.createToken(user, true);
        var jwtRefreshToken = jwtTokenService.createRefreshToken(user);

        log.info("LOGIN -> User EMAIL: {} with Roles: {}", request.email(), authUser.getAuthorities());
        LoginResponseDto loginDto = new LoginResponseDto(jwtToken, jwtRefreshToken, false);
        UserReadResponseDto userDto = userMapper.toUserReadResponseDto(user);
        return new LoginWithUserResponseDto(loginDto, userDto);
    }

    @Override
    public LoginResponseDto verifyMfa(MfaVerificationRequestDto request) {
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

    @Override
    public LoginResponseDto refreshToken(RefreshTokenRequest request) {
        String token = request.refreshToken();
        String email = jwtTokenService.validateRefreshToken(token);
        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found for email: " + email));

        if (!user.isActive()) { throw new RuntimeException("User account is inactive"); }
        if (user.isMfaRequired()) {
            log.info("REFRESH -> REFUSED, MFA REQUIRED FOR User EMAIL: {}", user.getEmail());
            return new LoginResponseDto(null, null, true);
        }

        String newAccessToken = jwtTokenService.createToken(user, true);
        String newRefreshToken = jwtTokenService.createRefreshToken(user);
        log.info("REFRESH -> SUCCESS, NEW TOKENS for User EMAIL: {}", user.getEmail());

        return new LoginResponseDto(newAccessToken, newRefreshToken, false);
    }
}
