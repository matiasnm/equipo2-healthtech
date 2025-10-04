package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.relatedperson.RelatedPersonCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonReadResponseDto;
import com.equipo2.healthtech.model.user.Identifier;
import com.equipo2.healthtech.model.user.RelatedPerson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RelatedPersonMapper {

    @Mapping(source = "userProfile.id", target = "userId")
    @Mapping(target = "identifiers", qualifiedByName = "mapIdentifiersWithRelatedPersonId")
    RelatedPersonReadResponseDto toRelatedPersonReadResponseDto(RelatedPerson relatedPerson);

    RelatedPerson toRelatedPerson(RelatedPersonCreateRequestDto dto);


    @Named("mapIdentifiersWithRelatedPersonId")
    default List<RelatedPersonIdentifierReadResponseDto> mapIdentifiersWithRelatedPersonId(List<Identifier> identifiers) {
        if (identifiers == null) return null;
        return identifiers.stream()
                .map(id -> {
                    RelatedPersonIdentifierReadResponseDto dto = new RelatedPersonIdentifierReadResponseDto(
                            id.getSystem(),
                            id.getValue(),
                            id.getType(),
                            id.getRelatedPerson() != null ? id.getRelatedPerson().getId() : null
                    );
                    return dto;
                }).toList();
    }
}
