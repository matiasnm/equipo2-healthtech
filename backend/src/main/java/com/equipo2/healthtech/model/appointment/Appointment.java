package com.equipo2.healthtech.model.appointment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appointments")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class Appointment {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
