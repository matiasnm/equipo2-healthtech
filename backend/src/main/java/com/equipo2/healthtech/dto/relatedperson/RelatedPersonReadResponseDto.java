package com.equipo2.healthtech.dto.relatedperson;

import com.equipo2.healthtech.model.user.RelatedPersonType;

import java.util.List;

public record RelatedPersonReadResponseDto(
        Long id,
        Long userId,
        RelatedPersonType type,
        String fullName,
        String phone,
        String email,
        String address,
        List<RelatedPersonIdentifierReadResponseDto> identifiers
) { }