package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.mapper.PractitionerRoleMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerRole;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleCode;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.repository.PractitionerRoleCodeRepository;
import com.equipo2.healthtech.repository.PractitionerRoleRepository;
import com.equipo2.healthtech.repository.SpecialityCodeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PractitionerServiceImpl implements PractitionerService{

    private final PractitionerRepository practitionerRepository;
    private final PractitionerRoleRepository practitionerRoleRepository;
    private final PractitionerRoleCodeRepository roleCodeRepository;
    private final SpecialityCodeRepository specialityCodeRepository;
    private final PractitionerRoleMapper practitionerRoleMapper;

    @Override
    public PractitionerReadResponseDto read(Long id) {
        return null;
    }

    @Override
    public PractitionerReadResponseDto readMe() {
        return null;
    }

    @Override
    public PractitionerRoleReadResponseDto createPractitionerRole(Long id, PractitionerRoleCreateRequestDto request) {
        Practitioner practitioner = practitionerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Practitioner not found"));

        PractitionerRole role = createRole(request);
        practitioner.setPractitionerRole(role);

        return practitionerRoleMapper.toPractitionerRoleReadResponseDto(role);
    }

    private PractitionerRole createRole(PractitionerRoleCreateRequestDto request) {
        var roleCode = roleCodeRepository.findById(request.roleCodeId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid role code id"));
        var specialityCode = specialityCodeRepository.findById(request.specialityCodeId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid speciality code id"));

        PractitionerRole role = new PractitionerRole();
        role.setRoleCode(roleCode);
        role.setSpecialityCode(specialityCode);
        return practitionerRoleRepository.save(role);
    }
}
