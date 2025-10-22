package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.practitioner.Practitioner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {

    Page<Practitioner> findAllByStatusIsTrueAndPractitionerRoleIsNotNull(Pageable pageable);

    List<Practitioner> findAllByIdInAndStatusTrueAndPractitionerRoleIsNotNull(List<Long> ids);

    //List<Practitioner> findAllByIdInAndStatusTrue(List<Long> ids);

    Optional<Practitioner> findByIdAndStatusTrue(Long id);

    @Query("""
        SELECT p FROM Practitioner p
        WHERE p.status = true
        AND p.id NOT IN (
            SELECT pr.id FROM Appointment a
            JOIN a.practitioners pr
            WHERE a.status <> 'CANCELLED'
            AND (a.startTime < :endTime AND a.endTime > :startTime)
        )
    """)
    List<Practitioner> findAvailableBetween(
            @Param("startTime") OffsetDateTime startTime,
            @Param("endTime") OffsetDateTime endTime);

    @Query("""
        SELECT COUNT(a) > 0 FROM Appointment a
        JOIN a.practitioners pr
        WHERE pr.id = :practitionerId
        AND a.status <> 'CANCELLED'
        AND (a.startTime < :endTime AND a.endTime > :startTime)
    """)
    boolean isPractitionerBusy(
            @Param("practitionerId") Long practitionerId,
            @Param("startTime") OffsetDateTime startTime,
            @Param("endTime") OffsetDateTime endTime);

    default boolean isPractitionerAvailable(Long practitionerId,
                                            OffsetDateTime startTime,
                                            OffsetDateTime endTime) {
        return !isPractitionerBusy(practitionerId, startTime, endTime);
    }

}
