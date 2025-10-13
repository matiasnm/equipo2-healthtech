package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.user.UserUpdatePasswordRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileUpdateRequestDto;
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
        return ResponseEntity.ok(userService.read(id));
    }

    @Operation(summary = "Gets current User")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<UserReadResponseDto> getMe() {
        return ResponseEntity.ok(userService.readMe());
    }

    @Operation(summary = "Creates a UserProfile")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/profile/create")
    public ResponseEntity<UserProfileReadResponseDto> createUser(@RequestBody @Valid UserProfileCreateRequestDto request, UriComponentsBuilder uriBuilder) {
        Long id = userProfileService.create(request);
        UserProfileReadResponseDto dto = userProfileService.read(id);
        URI location = uriBuilder.path("/users/profiles/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(location).body(dto);
    }

    @Operation(summary = "Updates a UserProfile")
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/profile/update")
    public ResponseEntity<Void> updateUserProfile(@RequestBody @Valid UserProfileUpdateRequestDto request) {
        userProfileService.update(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Updates User password")
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/password/update")
    public ResponseEntity<Void> updateUserPassword(@RequestBody @Valid UserUpdatePasswordRequestDto request) {
        userService.updatePassword(request);
        return ResponseEntity.noContent().build();
    }
}
