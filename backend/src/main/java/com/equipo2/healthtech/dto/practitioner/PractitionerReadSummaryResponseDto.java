package com.equipo2.healthtech.dto.practitioner;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;

public record PractitionerReadSummaryResponseDto(
    Long id,
    UserProfileReadSummaryResponseDto practitionerProfile,
    PractitionerRoleReadResponseDto practitionerRole
) { }