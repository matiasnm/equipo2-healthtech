package com.equipo2.healthtech.dto.clinic;

public record OfficeReadResponseDto(
    String code,
    String name,
    String description,
    String floor,
    boolean active) { }