package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.identifier.IdentifierCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileUpdateRequestDto;

public interface UserProfileService {

    Long create(UserProfileCreateRequestDto request);
    UserProfileReadResponseDto read(Long id);
    void update(UserProfileUpdateRequestDto request);

    UserProfileIdentifierReadResponseDto createUserProfileIdentifier(IdentifierCreateRequestDto request);
    void deleteUserProfileIdentifier(Long id);

    RelatedPersonReadResponseDto createRelatedPerson(RelatedPersonCreateRequestDto request);
    void updateRelatedPerson(Long id, RelatedPersonCreateRequestDto request);
    void deleteRelatedPerson(Long id);

    RelatedPersonIdentifierReadResponseDto createRelatedPersonIdentifier (Long id, IdentifierCreateRequestDto request);
    void deleteRelatedPersonIdentifier(Long relatedPersonId, Long identifierId);

    //IdentifierReadResponseDto readIdentifier(Long id);
    //RelatedPersonReadResponseDto readRelatedPerson(Long id);

}
