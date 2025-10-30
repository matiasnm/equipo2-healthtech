package com.equipo2.healthtech.dto.encounter;

import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import org.springframework.data.domain.Page;

public record EncounterWithPatientProfileDto(
        UserProfileReadSummaryResponseDto patientProfile,
        Page<EncounterWithAppointmentReadSummaryDto> encounters
) { }