package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.userProfile.RelatedPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelatedPersonRepository extends JpaRepository<RelatedPerson, Long> {
}
