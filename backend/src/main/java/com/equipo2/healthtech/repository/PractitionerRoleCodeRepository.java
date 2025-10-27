package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.practitioner.PractitionerRoleCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PractitionerRoleCodeRepository extends JpaRepository<PractitionerRoleCode, Long> {

    Page<PractitionerRoleCode> findByDisplayContainingIgnoreCase(String display, Pageable pageable);
}
