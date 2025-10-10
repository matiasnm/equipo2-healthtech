package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.practitioner.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {

    List<Practitioner> findAllByIdInAndStatusTrue(List<Long> ids);
}
