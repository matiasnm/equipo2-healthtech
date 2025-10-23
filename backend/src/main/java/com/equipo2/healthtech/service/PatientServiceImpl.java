package com.equipo2.healthtech.service;

import com.equipo2.healthtech.exception.ConflictGeneralPractitionerException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerSpecifications;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.PatientRepository;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
    private final SecurityUtils securityUtils;

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
}
