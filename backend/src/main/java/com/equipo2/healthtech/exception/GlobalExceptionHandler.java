package com.equipo2.healthtech.exception;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    ProblemDetail handleAuthenticationException(AuthenticationException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
        problemDetail.setTitle("Authentication error");
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    public ProblemDetail handleJwtAuthenticationException(JwtAuthenticationException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
        problemDetail.setTitle("Authentication error");
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle("Data Integrity Violation");
        problemDetail.setDetail("Invalid reference or missing required field: " + extractConstraintMessage(ex));
        problemDetail.setProperty("errorCategory", "Repository");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }

    private String extractConstraintMessage(DataIntegrityViolationException ex) {
        if (ex.getCause() != null) {
            return ex.getCause().getMessage();
        }
        return "Constraint violation occurred.";
    }

    @ExceptionHandler(NoAuthenticatedUserException.class)
    ProblemDetail handleNoAuthenticatedUserException(NoAuthenticatedUserException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("No authenticated User");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(InvalidMfaCodeException.class)
    ProblemDetail handleInvalidMfaCodeException(InvalidMfaCodeException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Invalid MFA code");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(MfaNotEnabledException.class)
    ProblemDetail handleMfaNotEnabledException(MfaNotEnabledException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Mfa not enabled");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(InvalidPasswordException.class)
    ProblemDetail handleInvalidPasswordException(InvalidPasswordException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
        problemDetail.setTitle("Wrong credentials");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(UserProfileAlreadyExistsException.class)
    ProblemDetail handleUserProfileAlreadyExistsException(UserProfileAlreadyExistsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("UserProfile already exists");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    ProblemDetail handleEmailAlreadyExistsException(EmailAlreadyExistsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("Email already exists");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(ConflictGeneralPractitionerException.class)
    ProblemDetail handleConflictGeneralPractitionerException(ConflictGeneralPractitionerException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("General Practitioner already assigned");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(ConflictAppointmentsException.class)
    ProblemDetail handleConflictAppointmentsException(ConflictAppointmentsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("Overlapping Appointments");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(ConflictEncounterException.class)
    ProblemDetail handleConflictEncounterException(ConflictEncounterException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
        problemDetail.setTitle("Error creating Encounter");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(NoResultsException.class)
    ProblemDetail handleNoResultsException(NoResultsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("No results");
        problemDetail.setType(URI.create("/"));
        problemDetail.setProperty("errorCategory", "Business");
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

    @ExceptionHandler(AccessDeniedException.class)
    ProblemDetail handleAccessDeniedException(AccessDeniedException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.getMessage());
        problemDetail.setTitle("Access Denied");
        problemDetail.setProperty("errorCategory", "Business");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }
}
