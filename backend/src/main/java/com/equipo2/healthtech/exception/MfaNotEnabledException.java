package com.equipo2.healthtech.exception;

public class MfaNotEnabledException extends RuntimeException {

    public MfaNotEnabledException(String email) {
        super("MFA not enabled for User: %s".formatted(email));
    }

    public static MfaNotEnabledException of(String email) {
        return new MfaNotEnabledException(email);
    }
}
