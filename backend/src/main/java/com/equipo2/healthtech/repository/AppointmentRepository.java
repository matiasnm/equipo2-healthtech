package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("""
        SELECT a FROM Appointment a
        JOIN a.practitioners p
        WHERE p.id = :practitionerId
    """)
    Page<Appointment> findAllByPractitionerId(Long practitionerId, Pageable pageable);

    Page<Appointment> findAllByPatientId(Long id, Pageable pageable);

    @Query("""
    SELECT a 
    FROM Appointment a
    LEFT JOIN FETCH a.patient p
    LEFT JOIN FETCH p.userProfile
    LEFT JOIN FETCH a.practitioners pr
    LEFT JOIN FETCH pr.userProfile
    LEFT JOIN FETCH pr.practitionerRole
    WHERE a.id = :id
    """)
    Optional<Appointment> findByIdWithParticipants(Long id);

    @Query("""
    SELECT COUNT(a) > 0
    FROM Appointment a
    JOIN a.practitioners p
    WHERE p.id = :practitionerId
      AND a.status = 'SCHEDULED'
      AND (a.startTime < :endTime AND a.endTime > :startTime)
    """)
    boolean existsConflictingAppointments(
            @Param("practitionerId") Long practitionerId,
            @Param("startTime") OffsetDateTime startTime,
            @Param("endTime") OffsetDateTime endTime);

    @Query("""
    SELECT DISTINCT a FROM Appointment a
    JOIN a.practitioners p
    WHERE p IN :practitioners
      AND a.status = 'SCHEDULED'
      AND (a.startTime < :endTime AND a.endTime > :startTime)
    """)
    List<Appointment> findConflicts(
            @Param("practitioners") List<Practitioner> practitioners,
            @Param("startTime") OffsetDateTime startTime,
            @Param("endTime") OffsetDateTime endTime);
}
