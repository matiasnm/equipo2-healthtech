package com.equipo2.healthtech.dto.userprofile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UserProfileUpdateRequestDto (
        @NotBlank
        @Size(max = 255)
        String fullName,

        @NotBlank
        @Size(max = 50)
        String phone,

        @NotBlank
        @Size(max = 500)
        String address,

        @NotNull
        LocalDate birthday
) {}