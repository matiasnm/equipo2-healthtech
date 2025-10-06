package com.equipo2.healthtech.model.user;

import com.equipo2.healthtech.model.patientRecord.PatientRecord;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "patients")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Patient extends User {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @ToString.Exclude
    private Practitioner generalPractitioner;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @ToString.Exclude
    private PatientRecord patientRecords;
}