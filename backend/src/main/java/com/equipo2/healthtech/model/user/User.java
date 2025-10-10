package com.equipo2.healthtech.model.user;

import com.equipo2.healthtech.model.AuditableEntity;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users") // ! IMPORTANT: Use plurals on DB tables and singular for Entity naming
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class User extends AuditableEntity implements UserDetails {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    @NotBlank
    @Size(min = 8, max = 255)
    private String password;

    @NotNull()
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = true)
    @ToString.Exclude
    private UserProfile userProfile;

    @Column(nullable = false)
    private boolean status = false;     // Pending UserData information...

    @Column(nullable = false)
    private int blocked = 0;            // Blocked on 3 failed login attempts

    @Column(nullable = false)
    private boolean active = true;      // Used to manually deactivate a user

    @Column(nullable = false)
    private boolean mfaRequired = false;

    @Column(nullable = false)
    private boolean accountLocked = false;

    @Column(nullable = false)
    private boolean credentialsExpired = false;

    @Size(max = 255)
    @Column(nullable = true)
    private String mfaSecret = null;

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
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isEnabled() {
        return active && isAccountNonExpired() && isAccountNonLocked() && isCredentialsNonExpired();
    }
}