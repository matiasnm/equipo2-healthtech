package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.exception.ConflictAppointmentsException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.dto.appointment.*;
import com.equipo2.healthtech.mapper.AppointmentMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.appointment.*;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.AppointmentRepository;
import com.equipo2.healthtech.repository.PatientRepository;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
    private final SecurityUtils securityUtils;
    private final AppointmentMapper appointmentMapper;
    private final UserMapper userMapper;

    private Appointment getAppointment(Long id) {
        if (id == null) throw NoResultsException.of("null");
        return appointmentRepository.findByIdWithParticipants(id)
                .orElseThrow(() -> NoResultsException.of(id));
    }

    private void validateScheduleConflict(OffsetDateTime start, OffsetDateTime end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Start and end time must be provided");
        }
        if (appointmentRepository.findConflictsAppointments(start, end).isPresent()) {
            throw ConflictAppointmentsException.of("An Appointment with the same schedule already exists");
        }
    }

    private Patient getValidPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> NoResultsException.of(patientId));
        if (!patient.isStatus()) {
            throw NoResultsException.of("Patient Profile is incomplete");
        }
        return patient;
    }

    private List<Practitioner> getValidPractitioners(List<Long> practitionerIds) {
        if (practitionerIds == null || practitionerIds.isEmpty()) {
            throw NoResultsException.of("Practitioner list is empty");
        }
        List<Practitioner> practitioners = practitionerRepository.findAllByIdInAndStatusTrue(practitionerIds);
        if (practitioners.size() != practitionerIds.size()) {
            throw NoResultsException.of("One or more Practitioners not found or inactive");
        }
        return practitioners;
    }

    private boolean canAccessAppointment(User user, Appointment appointment) {
        return switch (user.getRole()) {
            case ADMIN, SUPER_ADMIN -> true;
            case PATIENT -> appointment.getPatient().getId().equals(user.getId());
            case PRACTITIONER ->
                    appointment.getPractitioners().stream().anyMatch(p -> p.getId().equals(user.getId()));
            default -> false;
        };
    }

    @Override
    @Transactional
    public Long create(AppointmentCreateRequestDto request) {
        validateScheduleConflict(request.startTime(), request.endTime());

        Patient patient = getValidPatient(request.patientId());
        List<Practitioner> practitioners = getValidPractitioners(request.practitionerIds());
        User authUser = securityUtils.getAuthenticatedUser();

        if (!patient.getId().equals(authUser.getId()) &&
                authUser.getRole() != Role.ADMIN &&
                authUser.getRole() != Role.SUPER_ADMIN) {
            throw new AccessDeniedException("You are not allowed to create an appointment");
        }

        Appointment appointment = appointmentMapper.toAppointment(request);
        appointment.setPatient(patient);
        appointment.setPractitioners(practitioners);

        Appointment saved = appointmentRepository.save(appointment);
        log.info("CREATE -> APPOINTMENT ID: {}", saved.getId());
        return saved.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentReadDetailResponseDto read(Long id) {
        User user = securityUtils.getAuthenticatedUser();
        Appointment appointment = getAppointment(id);

        if (!canAccessAppointment(user, appointment)) {
            throw new AccessDeniedException("You are not allowed to view this appointment");
        }
        log.info("READ -> APPOINTMENT ID: {}", appointment.getId());
        log.info("    |-> APPOINTMENT PATIENT: {}", appointment.getPatient().getEmail());
        log.info("    |-> APPOINTMENT PRACTITIONERS: {}", appointment.getPractitioners().stream().map(Practitioner::getEmail).collect(Collectors.toList()));
        return appointmentMapper.toAppointmentReadDetailResponseDto(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentReadResponseDto> readAll(Pageable pageable) {
        User user = securityUtils.getAuthenticatedUser();
        Page<Appointment> appointments = switch (user.getRole()) {
            case ADMIN, SUPER_ADMIN -> appointmentRepository.findAll(pageable);
            case PRACTITIONER -> appointmentRepository.findAllByPractitionerId(user.getId(), pageable);
            case PATIENT -> appointmentRepository.findAllByPatientId(user.getId(), pageable);
            default -> throw new AccessDeniedException("You are not authorized to view appointments");
        };

        return appointments.map(appointmentMapper::toAppointmentReadResponseDto);
    }

    @Override
    @Transactional
    public void update(Long id, AppointmentUpdateRequestDto request) {
        validateScheduleConflict(request.startTime(), request.endTime());
        Appointment appointment = getAppointment(id);
        User user = securityUtils.getAuthenticatedUser();

        if (!canAccessAppointment(user, appointment)) {
            throw new AccessDeniedException("You are not allowed to update this appointment");
        }

        appointment.setStartTime(request.startTime());
        appointment.setEndTime(request.endTime());
        appointment.setPatient(getValidPatient(request.patientId()));
        appointment.setPractitioners(getValidPractitioners(request.practitionerIds()));

        appointmentRepository.save(appointment);
        log.info("UPDATE -> APPOINTMENT ID: {}", appointment.getId());
    }

    @Override
    @Transactional
    public void updateStatus(Long id, AppointmentStatus newStatus)
            throws NoResultsException, AccessDeniedException {

        User user = securityUtils.getAuthenticatedUser();
        Appointment appointment = getAppointment(id);

        if (!canAccessAppointment(user, appointment)) {
            throw new AccessDeniedException("You are not allowed to modify this appointment");
        }

        appointment.setStatus(newStatus);
        appointmentRepository.save(appointment);
        log.info("STATUS UPDATE -> APPOINTMENT ID: {}, STATUS: {}", appointment.getId(), newStatus);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public void delete(Long id) {
        Appointment appointment = getAppointment(id);
        appointmentRepository.delete(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PractitionerReadSummaryResponseDto> getAvailablePractitioners(
            OffsetDateTime start, OffsetDateTime end) {
        return practitionerRepository.findAvailableBetween(start, end)
                .stream()
                .map(userMapper::toPractitionerReadSummaryResponseDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isPractitionerAvailable(Long id, OffsetDateTime start, OffsetDateTime end) {
        return practitionerRepository.isPractitionerAvailable(id, start, end);
    }

}
