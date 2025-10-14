package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

public interface PractitionerService {

    public PractitionerReadResponseDto read(Long id);

    public PractitionerReadResponseDto readMe();

    public Page<PractitionerReadSummaryResponseDto> readAllActive(Pageable pageable);

    public PractitionerRoleReadResponseDto createPractitionerRole(Long id, PractitionerRoleCreateRequestDto request);
}
