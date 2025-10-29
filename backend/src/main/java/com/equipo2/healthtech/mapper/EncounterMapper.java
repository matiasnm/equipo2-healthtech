package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.CodeableConceptReadDto;
import com.equipo2.healthtech.dto.encounter.EncounterCreateRequestDto;
import com.equipo2.healthtech.dto.encounter.EncounterReadResponseDto;
import com.equipo2.healthtech.dto.encounter.EncounterUpdateRequestDto;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.encounter.Encounter;
import com.equipo2.healthtech.model.encounter.EncounterCode;
import com.equipo2.healthtech.model.patient.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = { }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EncounterMapper {

    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "appointment.id", target = "appointmentId")
    @Mapping(source = "reasonCode", target = "reason")
    @Mapping(source = "diagnosisCode", target = "diagnosis")
    EncounterReadResponseDto toEncounterReadResponseDto(Encounter encounter);

    @Mapping(source = "appointmentId", target = "appointment")
    @Mapping(source = "patientId", target = "patient")
    @Mapping(source = "reasonCodeId", target = "reasonCode.id")
    @Mapping(source = "diagnosisCodeId", target = "diagnosisCode.id")
    Encounter toEncounter(EncounterCreateRequestDto encounterCreateRequestDto);

    @Mapping(target = "reasonCode.id", source = "reasonCodeId")
    @Mapping(target = "diagnosisCode.id", source = "diagnosisCodeId")
    Encounter toEncounter(EncounterUpdateRequestDto encounterUpdateRequestDto);

    @Mapping(target = "reasonCode.id", source = "reasonCodeId")
    @Mapping(target = "diagnosisCode.id", source = "diagnosisCodeId")
    void updateEncounterFromDto(EncounterUpdateRequestDto dto, @MappingTarget Encounter encounter);

    CodeableConceptReadDto toCodeableConceptReadDto(EncounterCode encounterCode);

    // 🔹 Stub mappers (convert IDs → entities with only ID set)
    default Appointment mapAppointment(Long id) {
        if (id == null) return null;
        Appointment appointment = new Appointment();
        appointment.setId(id);
        return appointment;
    }

    default Patient mapPatient(Long id) {
        if (id == null) return null;
        Patient patient = new Patient();
        patient.setId(id);
        return patient;
    }

    default List<EncounterCode> mapEncounterCodes(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            EncounterCode code = new EncounterCode();
            code.setId(id);
            return code;
        }).toList();
    }
}