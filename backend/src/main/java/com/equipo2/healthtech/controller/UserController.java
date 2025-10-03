package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.service.UserProfileService;
import com.equipo2.healthtech.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/users")
@SecurityRequirement(name = "bearer-key")
@AllArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserProfileService userProfileService;

    @Operation(summary = "Gets an User by id")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserReadResponseDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.readUser(id));
    }

    @Operation(summary = "Gets current User")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<UserReadResponseDto> getMe() {
        return ResponseEntity.ok(userService.readUser());
    }

    @Operation(summary = "Creates a UserProfile")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/profile/create")
    public ResponseEntity<UserProfileReadResponseDto> createUser(@RequestBody @Valid UserProfileCreateRequestDto request, UriComponentsBuilder uriBuilder) {
        Long id = userProfileService.createUserProfile(request);
        UserProfileReadResponseDto dto = userProfileService.readUserProfile(id);
        URI location = uriBuilder.path("/users/profiles/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).body(dto);
    }

}
