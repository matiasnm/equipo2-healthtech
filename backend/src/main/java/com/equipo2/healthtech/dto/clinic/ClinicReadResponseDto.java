package com.equipo2.healthtech.dto.clinic;

import java.util.List;

public record ClinicReadResponseDto(
    Long id,
    List<OfficeReadResponseDto> offices,
    String secretaryPhone,
    String secretaryEmail,
    String administrationPhone,
    String administrationEmail,
    String businessName,
    String legalName,
    String taxId,
    String fiscalId,
    String address,
    String province,
    String country) { }