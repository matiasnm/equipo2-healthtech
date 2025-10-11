package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;

public interface PractitionerService {

    PractitionerReadResponseDto read(Long id);

    PractitionerReadResponseDto readMe();

    PractitionerRoleReadResponseDto createPractitionerRole(Long id, PractitionerRoleCreateRequestDto request);
}
