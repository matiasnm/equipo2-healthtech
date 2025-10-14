package com.equipo2.healthtech.exception;

public class NoResultsException extends RuntimeException {

    public NoResultsException(Long id) {
        super("No results for: %s".formatted(id));
    }

    public NoResultsException(String msg) {
        super(msg);
    }

    public static NoResultsException of(Long id) {
        return new NoResultsException(id);
    }

    public static NoResultsException of(String msg) { return new NoResultsException(msg); }
}