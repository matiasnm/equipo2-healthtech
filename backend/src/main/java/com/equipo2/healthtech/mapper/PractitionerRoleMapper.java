package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.CodeableConceptReadDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.model.practitioner.PractitionerRole;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleCode;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleSpecialityCode;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PractitionerRoleMapper {

    PractitionerRole toPractitionerRole(PractitionerRoleCreateRequestDto request);

    @Mapping(target = "roleCode", source = "roleCode")
    @Mapping(target = "specialityCode", source = "specialityCode")
    PractitionerRoleReadResponseDto toPractitionerRoleReadResponseDto(PractitionerRole practitionerRole);

    CodeableConceptReadDto toCodeableConceptReadDto(PractitionerRoleCode code);

    CodeableConceptReadDto toCodeableConceptReadDto(PractitionerRoleSpecialityCode code);
}
