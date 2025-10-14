package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.practitioner.PractitionerRoleSpecialityCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialityCodeRepository extends JpaRepository<PractitionerRoleSpecialityCode, Long> {
}
