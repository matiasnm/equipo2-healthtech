package com.equipo2.healthtech.model.practitioner;

import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.unavailability.Unavailability;
import com.equipo2.healthtech.model.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "practitioners")
@PrimaryKeyJoinColumn(name = "user_id")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
public class Practitioner extends User {

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "practitioner_role_id", nullable = false)
    private PractitionerRole practitionerRole;

    @OneToMany(mappedBy = "generalPractitioner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Patient> patients = new ArrayList<>();

    @ManyToMany(mappedBy = "practitioners", fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "practitioner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Unavailability> unavailability = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "practitioner_profile_id")
    private PractitionerProfile practitionerProfile;
}
