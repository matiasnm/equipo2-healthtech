package com.equipo2.healthtech.exception;

public class UserProfileAlreadyExistsException extends RuntimeException {

    public UserProfileAlreadyExistsException(String email) {
        super("UserProfile already exists for User: %s".formatted(email));
    }

    public static UserProfileAlreadyExistsException of(String email) {
        return new UserProfileAlreadyExistsException(email);
    }
}
