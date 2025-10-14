package com.equipo2.healthtech.security;

import com.equipo2.healthtech.exception.NoAuthenticatedUserException;
import com.equipo2.healthtech.model.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            throw new NoAuthenticatedUserException();
        }

        return (User) auth.getPrincipal();
    }
}