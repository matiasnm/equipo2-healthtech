package com.equipo2.healthtech.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "identifiers")
@Data
@NoArgsConstructor
public class Identifier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 255)
    private String system; // (ex: http://ar.gov/dni)

    @NotBlank
    @Size(max = 255)
    private String value;

    @NotNull
    @Enumerated(EnumType.STRING)
    private IdentifierType type;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private UserProfile userProfile;

    @ManyToOne
    @JoinColumn(name = "related_person_id", nullable = true)
    private RelatedPerson relatedPerson;
}