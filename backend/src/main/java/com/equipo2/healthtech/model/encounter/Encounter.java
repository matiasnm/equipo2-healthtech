package com.equipo2.healthtech.model.encounter;

import com.equipo2.healthtech.model.AuditableEntity;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.patient.Patient;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

/*
Recurso             Rol principal
Appointment         Es la cita programada (planeada). No hay todavía acto clínico.
Encounter	        Es la interacción real entre paciente y sistema (consulta, internación, etc.).
Condition	        Es una condición clínica o diagnóstico del paciente. Puede venir de una consulta previa o ser nuevo.
Observation	        Es un dato clínico medido u observado (signo vital, examen, análisis, etc.).
Procedure	        Es una intervención médica.
DiagnosticReport	Es un informe (por ejemplo de laboratorio o radiología).

Appointment
└── Encounter
      ├── reason (CodeableConcept)
      ├── diagnosis (EncounterDiagnosis)
      └── notes (text)
*/

@Entity
@Table(name = "encounters")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Encounter extends AuditableEntity {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NotNull
    private EncounterStatus encounterStatus;

    @Enumerated(EnumType.STRING)
    @NotNull
    private EncounterClass encounterClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reason_code_id")
    private EncounterCode reasonCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diagnosis_code_id")
    private EncounterCode diagnosisCode;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(columnDefinition = "TEXT")
    private String notes; // Observation, Procedure, MedicationStatement

}