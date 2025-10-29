package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.patient.PatientFindByRequestDto;
import com.equipo2.healthtech.dto.patient.PatientFindByResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.exception.ConflictGeneralPractitionerException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.PatientMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerSpecifications;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.model.userProfile.Identifier;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import com.equipo2.healthtech.repository.PatientRepository;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
    private final SecurityUtils securityUtils;
    private final PatientMapper patientMapper;
    private final UserMapper userMapper;

    @Override
    public void setGeneralPractitioner(Long id, Long practitionerId) {
        User authUser = securityUtils.getAuthenticatedUser();

        boolean allowed = authUser.getId().equals(id)
                || authUser.getRole() == Role.ADMIN
                || authUser.getRole() == Role.SUPER_ADMIN;

        if (!allowed) {
            throw new AccessDeniedException("You are not allowed to assign a general practitioner");
        }

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> NoResultsException.of("No results for Patient id: " + id));

        if (patient.getGeneralPractitioner() != null
                && patient.getGeneralPractitioner().getId().equals(practitionerId)) {
            throw ConflictGeneralPractitionerException.of("Patient already has this practitioner assigned");
        }

        Specification<Practitioner> spec = PractitionerSpecifications.isActiveAndConfigured()
                .and((root, query, cb) -> cb.equal(root.get("id"), practitionerId));

        Practitioner practitioner = practitionerRepository.findOne(spec)
                .orElseThrow(() -> NoResultsException.of("No results for Practitioner id: " + practitionerId));

        patient.setGeneralPractitioner(practitioner);
        patientRepository.save(patient);

        log.info("PATIENT id: {} -> GENERAL PRACTITIONER : {}", id, practitionerId);
    }

    @Override
    public Page<PatientFindByResponseDto> findByDto(PatientFindByRequestDto request, Pageable pageable) {
        log.info("PATIENT -> FIND BY: {}, {}, {}", request.fullName(), request.identifierValue(), request.summary());
        log.info("PATIENT -> SORT BY: {}", pageable.getSort());

        Specification<Patient> spec = (root, query, cb) -> {
            query.distinct(true);
            Join<Patient, UserProfile> profileJoin = root.join("userProfile", JoinType.LEFT);
            Join<UserProfile, Identifier> identifiersJoin = profileJoin.join("identifiers", JoinType.LEFT);

            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.isTrue(root.get("status")));

            if (request.fullName() != null && !request.fullName().isBlank()) {
                predicates.add(cb.like(cb.lower(profileJoin.get("fullName")), "%" + request.fullName().toLowerCase() + "%"));
            }
            if (request.identifierValue() != null && !request.identifierValue().isBlank()) {
                predicates.add(cb.like(cb.lower(identifiersJoin.get("value")), "%" + request.identifierValue().toLowerCase() + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        Page<Patient> patients = patientRepository.findAll(spec, pageable);

        return patients.map(p ->
                Boolean.TRUE.equals(request.summary())
                        ? patientMapper.toPatientSummaryFindByResponseDto(p)
                        : patientMapper.toPatientFullFindByResponseDto(p)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PractitionerReadSummaryResponseDto> getMyPractitioners(Pageable pageable) {
        User authUser = securityUtils.getAuthenticatedUser();
        if (authUser.getRole() != Role.PATIENT) {
            throw new AccessDeniedException("Only Patients are allowed to access");
        }
        Page<Practitioner> practitioners = practitionerRepository.findDistinctByPatientId(authUser.getId(), pageable);
        return practitioners.map(userMapper::toPractitionerReadSummaryResponseDto);
    }
}