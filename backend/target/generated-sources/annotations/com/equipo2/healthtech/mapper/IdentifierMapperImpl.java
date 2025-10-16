package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.identifier.IdentifierCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.user.UserIdentifierReadResponseDto;
import com.equipo2.healthtech.model.userProfile.Identifier;
import com.equipo2.healthtech.model.userProfile.IdentifierType;
import com.equipo2.healthtech.model.userProfile.RelatedPerson;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-14T09:46:46-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class IdentifierMapperImpl implements IdentifierMapper {

    @Override
    public UserIdentifierReadResponseDto toUserIdentifierReadResponseDto(Identifier identifier) {
        if ( identifier == null ) {
            return null;
        }

        Long userId = null;
        String system = null;
        String value = null;
        IdentifierType type = null;

        userId = identifierUserProfileId( identifier );
        system = identifier.getSystem();
        value = identifier.getValue();
        type = identifier.getType();

        UserIdentifierReadResponseDto userIdentifierReadResponseDto = new UserIdentifierReadResponseDto( system, value, type, userId );

        return userIdentifierReadResponseDto;
    }

    @Override
    public RelatedPersonIdentifierReadResponseDto toRelatedPersonIdentifierReadResponseDto(Identifier identifier) {
        if ( identifier == null ) {
            return null;
        }

        Long relatedPersonId = null;
        String system = null;
        String value = null;
        IdentifierType type = null;

        relatedPersonId = identifierRelatedPersonId( identifier );
        system = identifier.getSystem();
        value = identifier.getValue();
        type = identifier.getType();

        RelatedPersonIdentifierReadResponseDto relatedPersonIdentifierReadResponseDto = new RelatedPersonIdentifierReadResponseDto( system, value, type, relatedPersonId );

        return relatedPersonIdentifierReadResponseDto;
    }

    @Override
    public Identifier toIdentifier(IdentifierCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        Identifier identifier = new Identifier();

        identifier.setSystem( dto.system() );
        identifier.setValue( dto.value() );
        identifier.setType( dto.type() );

        return identifier;
    }

    private Long identifierUserProfileId(Identifier identifier) {
        if ( identifier == null ) {
            return null;
        }
        UserProfile userProfile = identifier.getUserProfile();
        if ( userProfile == null ) {
            return null;
        }
        Long id = userProfile.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long identifierRelatedPersonId(Identifier identifier) {
        if ( identifier == null ) {
            return null;
        }
        RelatedPerson relatedPerson = identifier.getRelatedPerson();
        if ( relatedPerson == null ) {
            return null;
        }
        Long id = relatedPerson.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
