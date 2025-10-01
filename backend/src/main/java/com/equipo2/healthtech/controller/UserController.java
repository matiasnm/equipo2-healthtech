package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.user.UserLoginRequestDto;
import com.equipo2.healthtech.dto.user.UserLoginResponseDto;
import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.security.JwtTokenService;
import com.equipo2.healthtech.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
@Slf4j
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final UserServiceImpl userService;

    @Operation(summary = "Register endpoint for ALL ROLES")
    @PostMapping({"/register"})
    public ResponseEntity<UserReadResponseDto> createUser(@RequestBody @Valid UserCreateRequestDto request, UriComponentsBuilder uriBuilder, @RequestParam Role expectedRole) {
        log.info("CREATE -> New User: {}", request);
        if (!request.role().equals(expectedRole)) throw new IllegalArgumentException("Invalid ROLE at this endpoint.");

        Long id = userService.createUser(request);
        UserReadResponseDto dto = userService.readUser(id);
        URI location = uriBuilder.path("/users/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    @Operation(summary = "Login endpoint for ALL ROLES")
    @PostMapping({"/login"})
    public ResponseEntity<UserLoginResponseDto> login(@RequestBody @Valid UserLoginRequestDto request) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        var authUser = authenticationManager.authenticate(authToken);
        var JwtToken = jwtTokenService.createToken((User) authUser.getPrincipal());
        log.info("LOGIN -> User EMAIL: {} with Roles: {}", request.email(), authUser.getAuthorities());
        return ResponseEntity.ok(new UserLoginResponseDto(JwtToken, null, true));
    }

    @Operation(summary = "Gets a response if authenticated and Role=ADMIN",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Hello Admin!";
    }

    @Operation(summary = "Gets a response if authenticated",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public String userEndpoint() {
        return "Hello Authenticated User!";
    }

    @Operation(summary = "Get full UserDetails",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public UserDetails getCurrentUser(Authentication auth) {
        return (UserDetails) auth.getPrincipal();
    }

    @Operation(summary = "Gets an User by id",
            security = { @SecurityRequirement(name = "bearer-key") })
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users/{id}")
    public ResponseEntity<UserReadResponseDto> usersIdEndpoint(@PathVariable Long id) {
        return ResponseEntity.ok(userService.readUser(id));
    }

}
