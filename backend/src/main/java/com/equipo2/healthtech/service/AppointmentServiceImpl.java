package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.dto.appointment.*;
import com.equipo2.healthtech.mapper.AppointmentMapper;
import com.equipo2.healthtech.mapper.PractitionerRoleMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.appointment.*;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerRole;
import com.equipo2.healthtech.model.practitioner.PractitionerSpecifications;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.AppointmentRepository;
import com.equipo2.healthtech.repository.PatientRepository;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.repository.PractitionerRoleRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.OffsetTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
    private final PractitionerRoleRepository practitionerRoleRepository;
    private final SecurityUtils securityUtils;
    private final AppointmentMapper appointmentMapper;
    private final UserMapper userMapper;
    private final PractitionerRoleMapper practitionerRoleMapper;
    private final AppointmentManagerService appointmentManagerService;


    public boolean canAccessAppointment(Appointment appointment) {
        User user = securityUtils.getAuthenticatedUser();
        return switch (user.getRole()) {
            case ADMIN, SUPER_ADMIN -> true;
            case PATIENT -> appointment.getPatient().getId().equals(user.getId());
            case PRACTITIONER ->
                    appointment.getPractitioners().stream().anyMatch(p -> p.getId().equals(user.getId()));
            default -> false;
        };
    }

    public Appointment getAppointment(Long id) {
        if (id == null) throw NoResultsException.of("Appointment id is null");
        return appointmentRepository.findByIdWithParticipants(id)
                .orElseThrow(() -> NoResultsException.of("Appointment not found with id: " + id));
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
            throw NoResultsException.of("Practitioner request list is empty");
        }
        Specification<Practitioner> spec = PractitionerSpecifications.isActiveAndConfigured()
                .and((root, query, cb) -> root.get("id").in(practitionerIds));
        List<Practitioner> practitioners = practitionerRepository.findAll(spec);

        if (practitioners.size() != practitionerIds.size()) {
            throw NoResultsException.of("One or more Practitioners not found or inactive");
        }
        return practitioners;
    }

    public Practitioner getValidPractitioner(Long id) {
        if (id == null) {
            throw NoResultsException.of("Practitioner Id is null");
        }
        Specification<Practitioner> spec = PractitionerSpecifications.isActiveAndConfigured()
                .and((root, query, cb) -> cb.equal(root.get("id"), id));
        return practitionerRepository.findOne(spec)
                .orElseThrow(() -> NoResultsException.of("Practitioner not found or inactive for Id: " + id));
    }

    @Override
    public boolean isPractitionerAvailable(Practitioner practitioner, OffsetDateTime start, OffsetDateTime end) {
        boolean hasUnavailability = practitioner.getUnavailability().stream()
                .anyMatch(u -> overlaps(
                        u.getStartTime(),
                        u.getEndTime(),
                        start.toOffsetTime(),
                        end.toOffsetTime())
                );
        if (hasUnavailability) {
            log.info("PRACTITIONER id: {} -> UNAVAILABILITY", practitioner.getId());
            return false;
        }

        boolean conflicts = appointmentRepository.existsConflictingAppointments(practitioner.getId(), start, end);
        if (conflicts) {
            log.info("PRACTITIONER id: {} -> APPOINTMENT CONFLICT", practitioner.getId());
            return false;
        }
        return true;
    }

    private void arePractitionersAvailable(List<Practitioner> practitioners, OffsetDateTime start, OffsetDateTime end) {
        for (Practitioner practitioner : practitioners) {
            if (!isPractitionerAvailable(practitioner, start, end)) {
                throw new IllegalStateException("Practitioner with ID: " + practitioner.getId() +
                        " is not available in the requested time slot.");
            }
        }
    }

    private boolean overlaps(OffsetTime uStart, OffsetTime uEnd, OffsetTime start, OffsetTime end) {
        return start.isBefore(uEnd) && end.isAfter(uStart);
    }

    @Override
    @Transactional
    public Long create(AppointmentCreateRequestDto request) {

        Patient patient = getValidPatient(request.patientId());
        User authUser = securityUtils.getAuthenticatedUser();

        if (!patient.getId().equals(authUser.getId()) &&
                authUser.getRole() != Role.ADMIN &&
                authUser.getRole() != Role.SUPER_ADMIN) {
            throw new AccessDeniedException("You are not allowed to create an appointment");
        }

        List<Practitioner> practitioners = getValidPractitioners(request.practitionerIds());
        OffsetDateTime start = request.startTime();
        OffsetDateTime end = request.endTime();
        arePractitionersAvailable(practitioners, start, end);

        Appointment appointment = appointmentMapper.toAppointment(request);
        appointment.setPatient(patient);
        appointment.setPractitioners(practitioners);

        Appointment saved = appointmentManagerService.scheduleAppointment(appointment);
        //Appointment saved = appointmentRepository.save(appointment);
        log.info("CREATE -> APPOINTMENT ID: {}", saved.getId());
        return saved.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentReadDetailResponseDto read(Long id) {
        Appointment appointment = getAppointment(id);
        if (!canAccessAppointment(appointment)) {
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
        Appointment appointment = getAppointment(id);
        if (!canAccessAppointment(appointment)) {
            throw new AccessDeniedException("You are not allowed to update this appointment");
        }

        List<Practitioner> practitioners = getValidPractitioners(request.practitionerIds());
        OffsetDateTime start = request.startTime();
        OffsetDateTime end = request.endTime();
        arePractitionersAvailable(practitioners, start, end);

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
        Appointment appointment = getAppointment(id);
        if (!canAccessAppointment(appointment)) {
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
    public List<PractitionerReadSummaryResponseDto> getAvailablePractitioners(AppointmentAvailabilityRequestDto request) {
        Specification<Practitioner> spec = PractitionerSpecifications.isActiveAndConfigured();

        if (request.remote() != null) {
            log.info("GET -> PRACTITIONERS BY REMOTE");
            spec = spec.and(PractitionerSpecifications.hasRemote(request.remote()));
        }

        if (request.specialityCode() != null && !request.specialityCode().isEmpty()) {
            log.info("GET -> PRACTITIONERS BY SPECIALITY CODE");
            spec = spec.and(PractitionerSpecifications.hasSpeciality(request.specialityCode()));
        }

        if (request.startTime() != null && request.endTime() != null) {
            log.info("GET -> PRACTITIONERS BY DATE");
            spec = spec.and(PractitionerSpecifications.isAvailableBetween(request.startTime(), request.endTime()));
        }

        List<Practitioner> practitioners = practitionerRepository.findAll(spec);

        return practitioners.stream()
                .map(userMapper::toPractitionerReadSummaryResponseDto)
                .toList();
    }

    public List<PractitionerRoleReadResponseDto> getAvailablePractitionerRoles() {
        return practitionerRoleRepository.findAll().stream()
                .map(practitionerRoleMapper::toPractitionerRoleReadResponseDto)
                .toList();
    }

}