package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.practitioner.Practitioner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PractitionerRepository extends JpaRepository<Practitioner, Long>, JpaSpecificationExecutor<Practitioner> {

    @Query("SELECT p FROM Practitioner p " +
            "LEFT JOIN FETCH p.practitionerProfile " +
            "LEFT JOIN FETCH p.practitionerRole " +
            "WHERE p.id = :id")
    Optional<Practitioner> findByIdWithProfileAndRole(@Param("id") Long id);

    @Query("""
    SELECT DISTINCT p
    FROM Appointment a
    JOIN a.practitioners p
    WHERE a.patient.id = :patientId
    """)
    Page<Practitioner> findDistinctByPatientId(@Param("patientId") Long patientId, Pageable pageable);

}