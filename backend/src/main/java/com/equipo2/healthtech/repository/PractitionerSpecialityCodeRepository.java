package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.practitioner.PractitionerRoleSpecialityCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PractitionerSpecialityCodeRepository extends JpaRepository<PractitionerRoleSpecialityCode, Long> {

    Page<PractitionerRoleSpecialityCode> findByDisplayContainingIgnoreCase(String display, Pageable pageable);

}
