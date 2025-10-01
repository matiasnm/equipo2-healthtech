package com.equipo2.healthtech.model.user;

import com.equipo2.healthtech.model.AuditableEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users") // ! IMPORTANT: Use plurals on DB tables and singular for Entity naming
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class User  extends AuditableEntity implements UserDetails {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull()
    private Long clinicId;

    @Column(unique = true)
    @NotBlank()
    private String email;

    @NotNull()
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotBlank()
    private String password;

    private boolean active = true; // Used to manually deactivate a user
    private boolean mfaRequired = false;
    private boolean accountLocked = false;
    private boolean credentialsExpired = false;
    private Instant accountExpiration;
    private Instant credentialsExpiration;


    private String firstName;
    private String lastName;
    private String phone;

    // UserDetails implementation...

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountExpiration == null || accountExpiration.isAfter(Instant.now());
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsExpiration == null || credentialsExpiration.isAfter(Instant.now());
    }

    @Override
    public boolean isEnabled() {
        return active && isAccountNonExpired() && isAccountNonLocked() && isCredentialsNonExpired();
    }

}
