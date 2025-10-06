package com.equipo2.healthtech.model.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "practitioners")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Practitioner {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
