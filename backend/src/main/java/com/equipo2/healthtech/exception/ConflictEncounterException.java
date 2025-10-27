package com.equipo2.healthtech.exception;

public class ConflictEncounterException extends RuntimeException {

    public ConflictEncounterException(String msg) {
        super(msg);
    }

    public static ConflictEncounterException of(String msg) {
        return new ConflictEncounterException(msg);
    }
}