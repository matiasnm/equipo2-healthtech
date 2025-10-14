package com.equipo2.healthtech.model.appointment;

import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "appointment_notifications")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class AppointmentNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Multiple notifications per Appointment ?
    //@ManyToOne(fetch = FetchType.LAZY)

    @NotNull
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    // Do I neeed this?? This reference is at the Appointment...

    //@ManyToOne(fetch = FetchType.EAGER)
    //@JoinColumn(name = "patient_id", nullable = false)
    //private Patient patient;

    //@ManyToOne(fetch = FetchType.EAGER)
    //@JoinColumn(name = "practitioner_id", nullable = false)
    //private Practitioner practitioner;

    private boolean status = false;

    @UpdateTimestamp
    @Column(updatable = true)
    private Instant sentAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AppointmentChannel channel;

    @PreUpdate
    public void updateSentAt() {
        if (status && sentAt == null) {
            sentAt = Instant.now();
        }
    }
}