package com.equipo2.healthtech.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.equipo2.healthtech.exception.JwtAuthenticationException;
import com.equipo2.healthtech.model.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.*;

@Service
public class JwtTokenService {

    @Value("${api.security.secret}")
    private String apiSecret;

    public String createToken(User user, boolean mfaVerified) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.create()
                    .withIssuer("health tech")
                    .withSubject(user.getEmail())
                    .withClaim("id", user.getId())
                    .withClaim("mfa_verified", mfaVerified)
                    .withExpiresAt(getExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException();
        }
    }

    public String getSubject(String token) {
        if (token == null) {
            throw new RuntimeException("Token is null");
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            DecodedJWT decodedJWT = JWT.require(algorithm)
                    .withIssuer("health tech")
                    .build()
                    .verify(token);

            String subject = decodedJWT.getSubject();
            if (subject == null) {
                throw JwtAuthenticationException.of("Token subject is null");
            }
            return subject;

        } catch (JWTVerificationException e) {
            throw JwtAuthenticationException.of("Invalid token: " + e.getMessage());
        }
    }

    private Instant getExpirationDate() {
        return Instant.now().plus(Duration.ofHours(2));
    }

    public String createRefreshToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.create()
                    .withIssuer("health tech")
                    .withSubject(user.getEmail())
                    .withClaim("id", user.getId())
                    .withClaim("type", "refresh")
                    .withExpiresAt(Instant.now().plus(Duration.ofDays(7))) // ej: 7 días
                    .sign(algorithm);
        } catch (JWTCreationException e){
            throw JwtAuthenticationException.of("Error creating refresh token: " + e.getMessage());
        }
    }

    public String validateRefreshToken(String token) {
        if (token == null || token.isBlank()) {
            throw JwtAuthenticationException.of("Refresh token is missing");
        }
        DecodedJWT decodedJWT = this.decode(token);
        String type = decodedJWT.getClaim("type").asString();
        if (!"refresh".equals(type)) {
            throw JwtAuthenticationException.of("Invalid token type. Expected 'refresh'.");
        }
        String email = decodedJWT.getSubject();
        if (email == null) {
            throw JwtAuthenticationException.of("Token subject (email) is missing.");
        }
        return email;
    }

    public DecodedJWT decode(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            return JWT.require(algorithm)
                    .withIssuer("health tech")
                    .build()
                    .verify(token);
        } catch (TokenExpiredException e) {
            throw JwtAuthenticationException.of("Token expired: " + e.getMessage());
        } catch (JWTVerificationException e) {
            throw JwtAuthenticationException.of("Invalid token: " + e.getMessage());
        }
    }

}