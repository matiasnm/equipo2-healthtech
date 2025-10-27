package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.patient.PatientFindByRequestDto;
import com.equipo2.healthtech.dto.patient.PatientFindByResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientService {

    public void setGeneralPractitioner(Long id, Long practitionerId);

    public Page<PatientFindByResponseDto> findByDto(PatientFindByRequestDto request, Pageable pageable);
}
