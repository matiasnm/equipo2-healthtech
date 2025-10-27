package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.identifier.IdentifierCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileIdentifierReadResponseDto;
import com.equipo2.healthtech.model.userProfile.Identifier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IdentifierMapper {

    @Mapping(source = "userProfile.id", target = "userProfileId")
    UserProfileIdentifierReadResponseDto toUserProfileIdentifierReadResponseDto(Identifier identifier);

    @Mapping(source = "relatedPerson.id", target = "relatedPersonId")
    RelatedPersonIdentifierReadResponseDto toRelatedPersonIdentifierReadResponseDto(Identifier identifier);

    Identifier toIdentifier(IdentifierCreateRequestDto dto);
}
