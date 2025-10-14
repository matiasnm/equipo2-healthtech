package com.equipo2.healthtech.exception;

public class InvalidMfaCodeException extends RuntimeException {

    public InvalidMfaCodeException(String email) {
        super("Invalid MFA code for User: %s".formatted(email));
    }

    public static InvalidMfaCodeException of(String email) {
        return new InvalidMfaCodeException(email);
    }
}
