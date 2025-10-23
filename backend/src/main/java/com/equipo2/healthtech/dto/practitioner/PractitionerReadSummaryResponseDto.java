package com.equipo2.healthtech.dto.practitioner;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.model.practitioner.PractitionerProfile;

public record PractitionerReadSummaryResponseDto(
    Long id,
    UserProfileReadSummaryResponseDto userProfile,
    PractitionerProfileReadResponseDto practitionerProfile,
    PractitionerRoleReadResponseDto practitionerRole
) { }