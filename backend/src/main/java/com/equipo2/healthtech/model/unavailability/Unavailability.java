package com.equipo2.healthtech.model.unavailability;

import com.equipo2.healthtech.model.practitioner.Practitioner;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.time.OffsetTime;

@Table(name = "practitioner_unavailability")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Unavailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "practitioner_id", nullable = false)
    private Practitioner practitioner;

    @NotNull
    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek;

    @NotNull
    @Column(name = "start_time", nullable = false)
    private OffsetTime startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private OffsetTime endTime;

}
