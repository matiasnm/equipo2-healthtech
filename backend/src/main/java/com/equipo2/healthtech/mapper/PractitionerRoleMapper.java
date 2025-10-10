package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.model.practitioner.PractitionerRole;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PractitionerRoleMapper {

    PractitionerRoleReadResponseDto toPractitionerRoleReadResponseDto(PractitionerRole practitionerRole);
    PractitionerRole toPractitionerRole(PractitionerRoleCreateRequestDto request);
}
