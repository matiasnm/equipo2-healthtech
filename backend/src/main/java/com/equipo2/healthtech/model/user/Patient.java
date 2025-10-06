package com.equipo2.healthtech.model.user;

import com.equipo2.healthtech.model.patientRecord.PatientRecord;
import jakarta.persistence.*;
import lombok.*;

@Entity
// @Table(name = "patients")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Patient extends User {

    // @Id()
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "general_practitioner_id")
    @ToString.Exclude
    private Practitioner generalPractitioner;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "patient_record_id")
    @ToString.Exclude
    private PatientRecord patientRecords;
}