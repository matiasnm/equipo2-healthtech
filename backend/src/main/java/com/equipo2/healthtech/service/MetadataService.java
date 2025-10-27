package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;

public interface MetadataService {

    ClinicReadResponseDto read(Long id);
}
