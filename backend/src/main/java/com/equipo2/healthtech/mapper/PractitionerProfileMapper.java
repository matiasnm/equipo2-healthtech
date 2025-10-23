package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.PractitionerProfileCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerProfileReadResponseDto;
import com.equipo2.healthtech.model.practitioner.PractitionerProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PractitionerProfileMapper {

    PractitionerProfileReadResponseDto toPractitionerProfileReadResponseDto(PractitionerProfile practitionerProfile);

    PractitionerProfile toPractitionerProfile(PractitionerProfileCreateRequestDto practitionerProfileCreateRequestDto);

    @Mapping(target = "id", ignore = true) // IMPORTANT[!]
    void updatePractitionerProfileFromDto(PractitionerProfileCreateRequestDto dto, @MappingTarget PractitionerProfile entity);
}