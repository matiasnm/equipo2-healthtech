package com.equipo2.healthtech.exception;

public class JwtAuthenticationException extends RuntimeException {

    public JwtAuthenticationException(String msg) {
        super(msg);
    }

    public static JwtAuthenticationException of(String msg) {
        return new JwtAuthenticationException(msg);
    }
}
