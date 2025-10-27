package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.patient.PatientFindByResponseDto;
import com.equipo2.healthtech.model.patient.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = {UserProfileMapper.class, PractitionerProfileMapper.class, PractitionerProfileMapper.class, UserMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PatientMapper {

    @Mapping(source = "userProfile", target = "userProfileSummary")
    @Mapping(target = "userProfile", ignore = true)
    PatientFindByResponseDto toPatientSummaryFindByResponseDto(Patient patient);

    @Mapping(source = "userProfile", target = "userProfile")
    @Mapping(target = "userProfileSummary", ignore = true)
    PatientFindByResponseDto toPatientFullFindByResponseDto(Patient patient);
}
