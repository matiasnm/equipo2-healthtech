package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.identifier.IdentifierCreateRequestDto;
import com.equipo2.healthtech.dto.identifier.IdentifierReadResponseDto;
import com.equipo2.healthtech.model.userProfile.Identifier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IdentifierMapper {

    @Mapping(source = "userProfile.id", target = "userId")
    IdentifierReadResponseDto toUserIdentifierReadResponseDto(Identifier identifier);

    @Mapping(source = "relatedPerson.id", target = "relatedPersonId")
    IdentifierReadResponseDto toRelatedPersonIdentifierReadResponseDto(Identifier identifier);

    Identifier toIdentifier(IdentifierCreateRequestDto dto);
}
