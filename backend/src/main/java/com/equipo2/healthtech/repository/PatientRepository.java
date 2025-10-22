package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
