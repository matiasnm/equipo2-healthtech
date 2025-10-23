package com.equipo2.healthtech.model.practitioner;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "practitioner_profiles")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PractitionerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "practitionerProfile", fetch = FetchType.LAZY)
    private Practitioner practitioner;

    @Column(nullable = false)
    private Integer experience;

    @Column(length = 500)
    private String studies;

    @Column(length = 2)
    private String officeCode;

    @Column(nullable = false)
    private boolean remote = true;
}