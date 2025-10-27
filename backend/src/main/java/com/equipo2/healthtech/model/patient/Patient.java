package com.equipo2.healthtech.model.patient;

import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.encounter.Encounter;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
@PrimaryKeyJoinColumn(name = "user_id")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Patient extends User {
/*
Patient
 ├── Encounter (visita)
 │    ├── Reason (motivo)
 │    ├── Diagnosis (diagnóstico)
 │    ├── Observation (signos vitales, resultados)
 │    ├── Procedure (tratamientos, intervenciones)
 │    ├── MedicationStatement / MedicationRequest
 │    └── Notes (resumen clínico)
 ├── AllergyIntolerance
 ├── Condition (enfermedades crónicas, antecedentes)
 ├── Immunization
 └── DocumentReference (archivos, estudios, imágenes, etc.)
*/
    @ManyToOne(fetch = FetchType.LAZY, optional = true, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "practitioner_id", nullable = true)
    @ToString.Exclude
    private Practitioner generalPractitioner;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Encounter> encounters = new ArrayList<>();

}