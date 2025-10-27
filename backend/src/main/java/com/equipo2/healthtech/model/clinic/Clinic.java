package com.equipo2.healthtech.model.clinic;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clinics")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Office> offices = new ArrayList<>();

    private String secretaryPhone;

    private String secretaryEmail;

    private String administrationPhone;

    private String administrationEmail;

    private String businessName; //razonSocial

    private String legalName;

    private String taxId; //cuit;

    private String fiscalId; //nif;

    private String address;

    private String province;

    private String country;

}