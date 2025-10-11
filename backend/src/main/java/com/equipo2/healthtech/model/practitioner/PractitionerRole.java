package com.equipo2.healthtech.model.practitioner;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "practitioner_roles")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class PractitionerRole {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "role_code_id", nullable = false)
    private PractitionerRoleCode roleCode;


    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "speciality_code_id", nullable = false)
    private PractitionerRoleSpecialityCode specialityCode;
}
