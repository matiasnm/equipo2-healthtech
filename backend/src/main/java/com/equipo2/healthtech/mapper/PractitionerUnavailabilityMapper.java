package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.PractitionerUnavailabilityCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerUnavailabilityReadResponseDto;
import com.equipo2.healthtech.model.unavailability.Unavailability;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PractitionerUnavailabilityMapper {

    Unavailability toUnavailability(PractitionerUnavailabilityCreateRequestDto request);

    List<Unavailability> toUnavailability(List<PractitionerUnavailabilityCreateRequestDto> request);

    List<PractitionerUnavailabilityReadResponseDto> toPractitionerUnavailabilityReadResponseDto(List<Unavailability> unavailability);

}
