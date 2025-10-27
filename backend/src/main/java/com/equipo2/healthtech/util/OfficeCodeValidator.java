package com.equipo2.healthtech.util;

import com.equipo2.healthtech.repository.OfficeRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OfficeCodeValidator implements ConstraintValidator<ValidOfficeCode, String> {

    private final OfficeRepository officeRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false;
        }
        return officeRepository.existsByCode(value);
    }
}