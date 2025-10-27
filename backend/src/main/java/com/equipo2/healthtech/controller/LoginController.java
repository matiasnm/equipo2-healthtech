package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.login.*;
import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.service.LoginService;
import com.equipo2.healthtech.service.MfaService;
import com.equipo2.healthtech.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
@Slf4j
@Tag(name = "1️⃣ Login")
public class LoginController {

    private final LoginService loginService;
    private final MfaService mfaService;
    private final UserService userService;

    @Operation(summary = "Register endpoint for ALL ROLES")
    @PostMapping({"/register"})
    public ResponseEntity<Void> createUser(@RequestBody @Valid UserCreateRequestDto request, UriComponentsBuilder uriBuilder) {
        log.info("CREATE -> New User: {}", request);
        Long id = userService.create(request);
        URI location = uriBuilder.path("/users/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).build();
    }

    @Operation(summary = "Login endpoint for ALL ROLES")
    @PostMapping("/login")
    public ResponseEntity<LoginWithUserResponseDto> login(@RequestBody @Valid LoginRequestDto request) {
        return ResponseEntity.ok(loginService.login(request));
    }

    @Operation(summary = "Verify MFA code and complete login")
    @PostMapping("/mfa/verify")
    public ResponseEntity<LoginResponseDto> verifyMfa(@RequestBody @Valid MfaVerificationRequestDto request) {
        return ResponseEntity.ok(loginService.verifyMfa(request));
    }

    @Operation(summary = "Enables MFA for this User")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearer-key")
    @PostMapping("/mfa/enable")
    public String enableMfa(Authentication auth) {
        return mfaService.enableMfa((User) auth.getPrincipal());
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDto> refreshToken(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(loginService.refreshToken(request));
    }

    //@PostMapping("/logout")
    //public ResponseEntity<Void> logout(@RequestBody LogoutRequest request) {
    //    loginService.logout(request);
    //    return ResponseEntity.noContent().build();
    //}
}
