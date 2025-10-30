package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.encounter.EncounterReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.exception.ConflictAppointmentsException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.dto.appointment.*;
import com.equipo2.healthtech.mapper.AppointmentMapper;
import com.equipo2.healthtech.mapper.EncounterMapper;
import com.equipo2.healthtech.mapper.PractitionerRoleMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.appointment.*;
import com.equipo2.healthtech.model.encounter.Encounter;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerSpecifications;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.*;
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
import java.time.temporal.ChronoUnit;
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
    private final EncounterRepository encounterRepository;
    private final EncounterMapper encounterMapper;


    private boolean canAccessAppointment(Appointment appointment) {
        User user = securityUtils.getAuthenticatedUser();
        return !switch (user.getRole()) {
            case ADMIN, SUPER_ADMIN -> true;
            case PATIENT -> appointment.getPatient().getId().equals(user.getId());
            case PRACTITIONER -> appointment.getPractitioners().stream().anyMatch(p -> p.getId().equals(user.getId()));
            default -> false;
        };
    }

    public void assertCanAccessAppointment(Appointment appointment) {
        if (this.canAccessAppointment(appointment)) {
            throw new AccessDeniedException("Access denied");
        }
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

    public List<Practitioner> findAvailablePractitioners(List<Long> practitionerIds, OffsetDateTime start, OffsetDateTime end) {
        Specification<Practitioner> spec = PractitionerSpecifications.isActiveAndConfigured()
                .and(PractitionerSpecifications.isAvailableBetween(start, end))
                .and((root, query, cb) -> root.get("id").in(practitionerIds));

        List<Practitioner> availablePractitioners = practitionerRepository.findAll(spec);
        List<Long> availableIds = availablePractitioners.stream()
                .map(Practitioner::getId)
                .toList();

        List<Long> unavailableIds = practitionerIds.stream()
                .filter(id -> !availableIds.contains(id))
                .toList();

        log.info("🩺 Requested practitioners: {}", practitionerIds);
        log.info("✅ Available practitioners: {}", availableIds);
        log.info("❌ Unavailable practitioners: {}", unavailableIds);

        if (availablePractitioners.isEmpty()) {
            log.warn("No practitioners available between {} and {}", start, end);
            throw NoResultsException.of("No practitioners available for the selected time window");
        }

        if (!unavailableIds.isEmpty()) {
            log.info("Proceeding with {} available practitioners ({} unavailable)",
                    availablePractitioners.size(), unavailableIds.size());
        }
        return availablePractitioners;
    }

    @Override
    public Practitioner findAvailablePractitioner(Long practitionerId, OffsetDateTime start, OffsetDateTime end) {
        Specification<Practitioner> spec = PractitionerSpecifications.isActiveAndConfigured()
                .and(PractitionerSpecifications.isAvailableBetween(start, end))
                .and((root, query, cb) -> cb.equal(root.get("id"), practitionerId));
        Practitioner practitioner = practitionerRepository.findOne(spec)
                .orElseThrow(() -> NoResultsException.of("Practitioner not available or inactive"));
        ensureNoConflictingAppointments(practitioner.getId(), start, end);
        return practitioner;
    }

    @Override
    public EncounterReadResponseDto fetchEncounter(Long id) {
        Encounter encounter = encounterRepository.findByAppointmentId(id)
                .orElseThrow(() -> NoResultsException.of("No Encounter found for Appointment Id: " + id));
        return encounterMapper.toEncounterReadResponseDto(encounter);
    }

    private void ensureNoConflictingAppointments(Long id, OffsetDateTime start, OffsetDateTime end) {
        if (appointmentRepository.existsConflictingAppointments(id, start, end)) {
            log.info("PRACTITIONER id: {} -> APPOINTMENT CONFLICT", id);
            throw ConflictAppointmentsException.of("Appointment Conflict for Practitioner Id: " + id);
        }
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
        OffsetDateTime start = request.startTime().truncatedTo(ChronoUnit.MINUTES);
        OffsetDateTime end = request.endTime().truncatedTo(ChronoUnit.MINUTES);

        List<Practitioner> practitioners = findAvailablePractitioners(request.practitionerIds(), start, end);

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
        this.assertCanAccessAppointment(appointment);
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
            case ADMIN, SUPER_ADMIN -> appointmentRepository.findAllWithEagerRelations(pageable);
            case PRACTITIONER -> appointmentRepository.findAllByPractitionerId(user.getId(), pageable);
            case PATIENT -> appointmentRepository.findAllByPatientId(user.getId(), pageable);
            default -> throw new AccessDeniedException("You are not authorized to view appointments");
        };
        return appointments.map(appointmentMapper::toAppointmentReadResponseDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentReadResponseDto> readAllByDate(
            AppointmentByDateRequestDto request) {
        Long practitionerId = null;
        Long patientId = null;
        User user = securityUtils.getAuthenticatedUser();
        switch (user.getRole()) {
            case PRACTITIONER -> practitionerId = user.getId();
            case PATIENT -> patientId = user.getId();
            case ADMIN, SUPER_ADMIN -> {}
            default -> throw new AccessDeniedException("You are not authorized to view appointments");
        }
        List<Appointment> appointments = appointmentRepository.findAllFiltered(
                request.startTime(),
                request.endTime(),
                practitionerId,
                patientId
        );
        return appointments.stream()
                .map(appointmentMapper::toAppointmentReadResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public void update(Long id, AppointmentUpdateRequestDto request) {
        Appointment appointment = getAppointment(id);
        this.assertCanAccessAppointment(appointment);
        OffsetDateTime start = request.startTime().truncatedTo(ChronoUnit.MINUTES);
        OffsetDateTime end = request.endTime().truncatedTo(ChronoUnit.MINUTES);
        List<Practitioner> practitioners = findAvailablePractitioners(request.practitionerIds(), start, end);
    // USAR APPOINTMEN MANAGER
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
        this.assertCanAccessAppointment(appointment);

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