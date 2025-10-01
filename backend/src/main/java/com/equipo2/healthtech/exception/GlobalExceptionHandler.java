package com.equipo2.healthtech.exception;

import java.net.URI;
import java.time.Instant;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    ProblemDetail handleEmailAlreadyExistsException(EmailAlreadyExistsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("Email already exists");
        problemDetail.setType(URI.create("/errors/email-already-exists"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(NoResultsException.class)
    ProblemDetail handleNoResultsException(NoResultsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("No results");
        problemDetail.setType(URI.create("/")); //https://api.ejemplo.com/errors/not-found
        problemDetail.setProperty("errorCategory", "Repository");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(ConstraintViolationException.class)
    ProblemDetail handleNotFoundException(ConstraintViolationException e) {

        Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
        StringBuilder errorMsg = new StringBuilder();
        for (ConstraintViolation<?> violation : violations) {
            String prop = violation.getPropertyPath().toString();
            prop = prop.substring(0,1).toUpperCase().concat(prop.substring(1));
            errorMsg
                    .append(prop).append(" ")
                    .append(violation.getMessage()).append(".");
        }
        String msg = errorMsg.toString();

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, msg);
        problemDetail.setTitle("Not found");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Server");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ProblemDetail handleIllegalArgument(IllegalArgumentException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("Invalid Argument");
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("Invalid Argument");
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }
}
