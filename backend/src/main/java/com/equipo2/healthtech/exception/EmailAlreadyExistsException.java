package com.equipo2.healthtech.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(String email) {
        super("Email already exists: %s".formatted(email));
    }

    public static EmailAlreadyExistsException of(String email) {
        return new EmailAlreadyExistsException(email);
    }
}