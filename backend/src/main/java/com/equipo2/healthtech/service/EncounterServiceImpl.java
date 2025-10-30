package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.encounter.*;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.exception.ConflictEncounterException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.EncounterMapper;
import com.equipo2.healthtech.mapper.UserProfileMapper;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.encounter.Encounter;
import com.equipo2.healthtech.model.encounter.EncounterCode;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.EncounterCodeRepository;
import com.equipo2.healthtech.repository.EncounterRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EncounterServiceImpl implements EncounterService {

    private final EncounterRepository encounterRepository;
    private final EncounterMapper encounterMapper;
    private final SecurityUtils securityUtils;
    private final AppointmentService appointmentService;
    private final EncounterCodeRepository encounterCodeRepository;
    private final UserProfileMapper userProfileMapper;

    private void validateReferences(EncounterCreateRequestDto dto) {
        Appointment appointment = appointmentService.getAppointment(dto.appointmentId());
        appointmentService.assertCanAccessAppointment(appointment);
        if (encounterRepository.existsByAppointmentId(dto.appointmentId())) {
            throw ConflictEncounterException.of("Appointment " + dto.appointmentId() + " is already linked to an encounter");
        }
        if (!appointment.getPatient().getId().equals(dto.patientId())) {
            throw ConflictEncounterException.of("Patient in appointment does not match encounter patient");
        }
    }

    public Encounter getEncounter(Long id) {
        if (id == null) throw NoResultsException.of("Encounter id is null");
        return encounterRepository.findByIdWithRelations(id)
                .orElseThrow(() -> NoResultsException.of("Encounter not found for id: " + id));
    }

    @Override
    @Transactional
    public Long create(EncounterCreateRequestDto request) {
        validateReferences(request);
        Encounter encounter = encounterMapper.toEncounter(request);
        EncounterCode diagnosis = getValidCode(request.diagnosisCodeId());
        EncounterCode reason = getValidCode(request.reasonCodeId());
        encounter.setDiagnosisCode(diagnosis);
        encounter.setReasonCode(reason);
        Encounter saved = encounterRepository.save(encounter);
        log.info("CREATE -> ENCOUNTER ID: {}", saved.getId());
        return saved.getId();
    }

    @Override
    public EncounterReadResponseDto read(Long id) {
        return encounterMapper.toEncounterReadResponseDto(getEncounter(id));
    }

    @Override
    public Page<EncounterReadResponseDto> readAll(Pageable pageable) {
        User user = securityUtils.getAuthenticatedUser();
        Page<Encounter> encounters = switch (user.getRole()) {
            case ADMIN, SUPER_ADMIN -> encounterRepository.findAll(pageable);
            case PRACTITIONER -> encounterRepository.findAllByPractitionerId(user.getId(), pageable);
            case PATIENT -> encounterRepository.findAllByPatientId(user.getId(), pageable);
            default -> throw new AccessDeniedException("You are not authorized to view encounters");
        };
        return encounters.map(encounterMapper::toEncounterReadResponseDto);
    }

    public EncounterWithPatientProfileDto readAllByPatientId(Long id, Pageable pageable) {
        User user = securityUtils.getAuthenticatedUser();
        if (user.getRole().equals(Role.PATIENT)) throw new AccessDeniedException("You are not authorized");
        Page<Encounter> encounters = encounterRepository.findAllByPatientId(id, pageable);
        if (encounters.isEmpty()) {
            throw new EntityNotFoundException("No encounters found for patient Id: " + id);
        }

        // Get patient from any encounter (since all belong to same patient)
        Patient patient = encounters.stream()
                .map(Encounter::getPatient)
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Patient not found for encounters"));
        UserProfileReadSummaryResponseDto patientProfile = userProfileMapper.toUserProfileReadSummaryResponseDto(patient.getUserProfile());
        return new EncounterWithPatientProfileDto(
                patientProfile,
                encounters.map(encounterMapper::toEncounterWithAppointmentReadSummaryDto));
    }

    @Override
    @Transactional
    public void update(Long id, EncounterUpdateRequestDto request) {
        Encounter encounter = getEncounter(id);
        Appointment appointment = encounter.getAppointment();
        appointmentService.assertCanAccessAppointment(appointment);
        encounterMapper.updateEncounterFromDto(request, encounter);
        getValidCode(request.diagnosisCodeId());
        getValidCode(request.reasonCodeId());
        encounterRepository.save(encounter);
        log.info("UPDATE -> ENCOUNTER ID: {}", encounter.getId());
    }

    private EncounterCode getValidCode(Long id) {
        if (id == null) throw NoResultsException.of("Encounter Code is null");
        return encounterCodeRepository.findById(id)
                .orElseThrow(() -> new NoResultsException("Encounter Code not found"));
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public void delete(Long id) {
        Encounter encounter = getEncounter(id);
        encounterRepository.delete(encounter);
    }
}
