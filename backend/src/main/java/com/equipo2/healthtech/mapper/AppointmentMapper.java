package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.appointment.AppointmentCreateRequestDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadDetailResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { UserProfileMapper.class, UserMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppointmentMapper {

    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "practitioners", target = "practitionerIds", qualifiedByName = "mapPractitionersToIds")
    @Mapping(source = "patient.userProfile", target = "patientProfile")
    AppointmentReadResponseDto toAppointmentReadResponseDto(Appointment appointment);

    @Mapping(source = "patient.userProfile", target = "patientProfile")
    @Mapping(source = "practitioners", target = "practitioners")
    AppointmentReadDetailResponseDto toAppointmentReadDetailResponseDto(Appointment appointment);

    @Mapping(source = "patientId", target = "patient")
    @Mapping(source = "practitionerIds", target = "practitioners")
    Appointment toAppointment(AppointmentCreateRequestDto dto);

    @Mapping(source = "practitioners", target = "practitioners")
    AppointmentReadSummaryResponseDto toAppointmentReadSummaryResponseDto(Appointment appointment);

    @Named("mapPractitionersToIds")
    default List<Long> mapPractitionersToIds(List<Practitioner> practitioners) {
        return practitioners == null
                ? null
                : practitioners.stream()
                .map(Practitioner::getId)
                .collect(Collectors.toList());
    }

    default Patient mapPatientFromAppointmentDto(Long id) {
        if (id == null) return null;
        Patient p = new Patient();
        p.setId(id);
        return p;
    }

    default List<Practitioner> mapPractitionersFromAppointmentDto(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream()
                .map(id -> {
                    Practitioner pr = new Practitioner();
                    pr.setId(id);
                    return pr;
                })
                .toList();
    }
}
