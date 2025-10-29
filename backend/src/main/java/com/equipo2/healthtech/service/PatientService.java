package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.patient.PatientFindByRequestDto;
import com.equipo2.healthtech.dto.patient.PatientFindByResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientService {

    public Page<PractitionerReadSummaryResponseDto> getMyPractitioners(Pageable pageable);

    public void setGeneralPractitioner(Long id, Long practitionerId);

    public Page<PatientFindByResponseDto> findByDto(PatientFindByRequestDto request, Pageable pageable);
}
