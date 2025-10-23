package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;

public interface ClinicService {

    ClinicReadResponseDto read(Long id);
}
