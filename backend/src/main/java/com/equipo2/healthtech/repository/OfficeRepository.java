package com.equipo2.healthtech.repository;

import com.equipo2.healthtech.model.clinic.Office;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.repository.CrudRepository;

public interface OfficeRepository extends CrudRepository<Office, Long> {

    boolean existsByCode(@NotNull String code);
}
