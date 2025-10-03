package com.equipo2.healthtech.exception;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException(String email) {
        super("Wrong credentials for User: %s".formatted(email));
    }

    public static InvalidPasswordException of(String email) {
        return new InvalidPasswordException(email);
    }
}
