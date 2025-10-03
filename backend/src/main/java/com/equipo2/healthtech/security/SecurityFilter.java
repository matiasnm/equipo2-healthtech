package com.equipo2.healthtech.security;

import java.io.IOException;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Slf4j
@AllArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final JwtTokenService tokenService;
    private final AuthenticationService authenticationService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Ignores OPTIONS method for 'preflight'
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        var authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            var token = authHeader.substring(7);
            var decoded = tokenService.decode(token);
            boolean mfaVerified = decoded.getClaim("mfa_verified").asBoolean();
            var username = tokenService.getSubject(token);
            if (mfaVerified) {
                var user = authenticationService.loadUserByUsername(username);
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("USER: " + username);
                log.info("TOKEN: " + token);
            } else {
                log.warn("MFA NOT VERIFIED -> USER: " + username);
                if (!request.getRequestURI().startsWith("/auth/mfa/verify")) {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    return;
                }
            }
        }

        // Optional, reads 'Verifier' if needed...
        var verifier = request.getHeader("Verifier");
        log.info("VERIFIER: " + verifier);
        filterChain.doFilter(request, response);
    }
}