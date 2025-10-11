package com.equipo2.healthtech.exception;

public class ConflictGeneralPractitionerException  extends RuntimeException {

    public ConflictGeneralPractitionerException(String msg) {
        super(msg);
    }

    public static ConflictGeneralPractitionerException of(String msg) {
        return new ConflictGeneralPractitionerException(msg);
    }
}