package com.equipo2.healthtech.dto.userprofile;

import com.equipo2.healthtech.dto.user.UserIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonReadResponseDto;

import java.time.LocalDate;
import java.util.List;

public record UserProfileReadResponseDto(
        Long id,
        String fullName,
        String phone,
        String address,
        LocalDate birthday,
        List<UserIdentifierReadResponseDto> identifiers,
        List<RelatedPersonReadResponseDto> relatedPersons
) {}