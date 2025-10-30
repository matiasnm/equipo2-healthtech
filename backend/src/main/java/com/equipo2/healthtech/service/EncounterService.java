package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.encounter.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EncounterService {

    public Long create(EncounterCreateRequestDto request);

    public EncounterReadResponseDto read(Long id);

    public Page<EncounterReadResponseDto> readAll(Pageable pageable);

    public void update(Long id, EncounterUpdateRequestDto request);

    public void delete(Long id);

    public EncounterWithPatientProfileDto readAllByPatientId(Long id, Pageable pageable);

}
