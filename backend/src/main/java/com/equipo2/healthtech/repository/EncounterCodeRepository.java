package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.encounter.EncounterCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EncounterCodeRepository extends JpaRepository<EncounterCode, Long> {
    Page<EncounterCode> findByDisplayContainingIgnoreCase(String display, Pageable pageable);
}
