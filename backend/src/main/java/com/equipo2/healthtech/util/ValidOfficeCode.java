package com.equipo2.healthtech.util;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = OfficeCodeValidator.class)
@Documented
public @interface ValidOfficeCode {
    String message() default "Invalid office code";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}