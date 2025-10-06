package com.equipo2.healthtech.model.patient;

import com.equipo2.healthtech.model.encounter.Encounter;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "patients")
@DiscriminatorValue("PATIENT")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Patient extends User {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "practitioner_id")
    @ToString.Exclude
    private Practitioner generalPractitioner;

}