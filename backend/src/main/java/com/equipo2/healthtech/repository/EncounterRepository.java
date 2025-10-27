package com.equipo2.healthtech.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.equipo2.healthtech.model.encounter.Encounter;

import java.util.Optional;

@Repository
public interface EncounterRepository extends JpaRepository<Encounter, Long> {

    @Query("""
    SELECT e FROM Encounter e
    JOIN FETCH e.appointment a
    JOIN FETCH a.practitioners pr
    JOIN FETCH e.patient p
    WHERE e.id = :id
    """)
    Optional<Encounter> findByIdWithRelations(@Param("id") Long id);

    // DOESNT loads Patients and Appointments eagerly [!]
    @Query("""
    SELECT DISTINCT e FROM Encounter e
    JOIN e.appointment a
    JOIN a.practitioners pr
    WHERE pr.id = :practitionerId
    """)
    Page<Encounter> findAllByPractitionerId(@Param("practitionerId") Long practitionerId, Pageable pageable);

    Page<Encounter> findAllByPatientId(Long patientId, Pageable pageable);

    boolean existsByAppointmentId(Long AppointmentId);
}
