package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.userProfile.Identifier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IdentifierRepository extends JpaRepository<Identifier, Long> {
}
