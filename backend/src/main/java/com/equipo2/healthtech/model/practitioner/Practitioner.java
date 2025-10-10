package com.equipo2.healthtech.model.practitioner;

import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "practitioners")
@PrimaryKeyJoinColumn(name = "user_id")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Practitioner extends User {

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "practitioner_role_id", nullable = false)
    private PractitionerRole practitionerRole;

    @OneToMany(mappedBy = "generalPractitioner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Patient> patients = new ArrayList<>();

    @ManyToMany(mappedBy = "practitioners", fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>();

}
