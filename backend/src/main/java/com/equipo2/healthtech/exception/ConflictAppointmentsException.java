package com.equipo2.healthtech.exception;

public class ConflictAppointmentsException  extends RuntimeException {

    public ConflictAppointmentsException(String msg) {
        super(msg);
    }

    public static ConflictAppointmentsException of(String msg) {
        return new ConflictAppointmentsException(msg);
    }
}