package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.ClinicMapper;
import com.equipo2.healthtech.model.clinic.Clinic;
import com.equipo2.healthtech.repository.ClinicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClinicServiceImpl implements ClinicService {

    private final ClinicRepository clinicRepository;
    private final ClinicMapper clinicMapper;

    @Override
    public ClinicReadResponseDto read(Long id) {
        Clinic clinic = clinicRepository.findById(id).orElseThrow( () -> NoResultsException.of("No results for Clinic id: " + id));
        return clinicMapper.toReadClinicResponseDto(clinic);
    }
}
