package com.equipo2.healthtech.dto.userprofile;

import java.time.LocalDate;

public record UserProfileReadSummaryResponseDto(
        Long id,
        String fullName,
        String gender,
        String phone,
        String address,
        LocalDate birthday
) {}