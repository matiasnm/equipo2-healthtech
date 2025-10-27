package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PractitionerService {

    public PractitionerReadResponseDto read(Long id);

    public PractitionerReadResponseDto readMe();

    public Page<PractitionerReadSummaryResponseDto> readAllActive(Pageable pageable);

    public PractitionerRoleReadResponseDto setPractitionerRole(Long id, PractitionerRoleCreateRequestDto request);

    public PractitionerProfileReadResponseDto setPractitionerProfile(Long id, PractitionerProfileCreateRequestDto request);

    public List<PractitionerUnavailabilityReadResponseDto> setPractitionerUnavailability(Long id, List<PractitionerUnavailabilityCreateRequestDto> request);
}
