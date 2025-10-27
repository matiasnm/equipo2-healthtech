package com.equipo2.healthtech.dto.practitioner;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;

import java.util.List;

public record PractitionerReadResponseDto(
    Long id,
    UserProfileReadResponseDto userProfile,
    PractitionerProfileReadResponseDto practitionerProfile,
    PractitionerRoleReadResponseDto practitionerRole,
    List<PractitionerUnavailabilityReadResponseDto> unavailability
) { }