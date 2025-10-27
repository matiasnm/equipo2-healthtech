package com.equipo2.healthtech.dto.patient;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record PatientFindByResponseDto (
        Long id,
        UserProfileReadSummaryResponseDto userProfileSummary,
        UserProfileReadResponseDto userProfile
    ){ }
