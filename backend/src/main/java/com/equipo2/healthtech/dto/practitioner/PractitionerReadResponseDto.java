package com.equipo2.healthtech.dto.practitioner;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;

public record PractitionerReadResponseDto(
    UserProfileReadResponseDto practitionerProfile,
    PractitionerRoleReadResponseDto practitionerRole
) { }