package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;
import com.equipo2.healthtech.dto.clinic.OfficeReadResponseDto;
import com.equipo2.healthtech.model.clinic.Clinic;
import com.equipo2.healthtech.model.clinic.Office;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClinicMapper {

    ClinicReadResponseDto toReadClinicResponseDto(Clinic clinic);

    OfficeReadResponseDto toReadOfficeResponseDto(Office ofice);

    List<OfficeReadResponseDto> toReadOfficeResponseDtoList(List<Office> offices);
}
