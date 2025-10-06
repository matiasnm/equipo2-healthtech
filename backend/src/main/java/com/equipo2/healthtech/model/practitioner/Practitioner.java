package com.equipo2.healthtech.model.practitioner;

import com.equipo2.healthtech.model.patient.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "practitioners")
@DiscriminatorValue("PRACTITIONER")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Practitioner {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "generalPractitioner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Patient> patients = new ArrayList<>();

}
