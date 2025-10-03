package com.equipo2.healthtech.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "related_persons")
@Data
@NoArgsConstructor
public class RelatedPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull()
    @Enumerated(EnumType.STRING)
    private RelatedPersonType type;

    @NotBlank()
    @Size(max = 255)
    private String fullName;

    @NotBlank()
    @Size(max = 50)
    private String phone;

    @Column(unique = true)
    @Email
    @Size(max = 255)
    private String email;

    @Size(max = 500)
    private String address;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;
    
    @OneToMany(mappedBy = "relatedPerson", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @ToString.Exclude
    private List<Identifier> identifiers = new ArrayList<>();
}
