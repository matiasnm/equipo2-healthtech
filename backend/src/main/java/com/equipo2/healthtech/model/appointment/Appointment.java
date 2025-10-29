package com.equipo2.healthtech.model.appointment;

import com.equipo2.healthtech.model.AuditableEntity;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "appointments")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
public class Appointment extends AuditableEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "patient_id", referencedColumnName = "user_id", nullable = false)
    private Patient patient;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "appointment_practitioners",
        joinColumns = @JoinColumn(name = "appointment_id"),
        inverseJoinColumns = @JoinColumn(name = "practitioner_id")
    )
    private List<Practitioner> practitioners = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private AppointmentPriority priority = AppointmentPriority.NORMAL;

    // Google Calendar API uses RFC 3339 timestamps, e.g.
    // 2025-10-06T14:00:00-03:00
    // This format includes an offset from UTC, which OffsetDateTime represents perfectly.

    @NotNull
    @Column(name = "start_time", nullable = false)
    private OffsetDateTime startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private OffsetDateTime endTime;

    @Enumerated(EnumType.STRING)
    @NotNull
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;

    @Size(max=255)
    private String teleconsultationUrl;

    //@Column(name = "google_event_id", length = 255)
    //private String googleEventId;

}