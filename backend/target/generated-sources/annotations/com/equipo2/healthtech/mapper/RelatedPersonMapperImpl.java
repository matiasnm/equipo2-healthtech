package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.relatedperson.RelatedPersonCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonReadResponseDto;
import com.equipo2.healthtech.model.userProfile.RelatedPerson;
import com.equipo2.healthtech.model.userProfile.RelatedPersonType;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-14T09:46:47-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class RelatedPersonMapperImpl implements RelatedPersonMapper {

    @Override
    public RelatedPersonReadResponseDto toRelatedPersonReadResponseDto(RelatedPerson relatedPerson) {
        if ( relatedPerson == null ) {
            return null;
        }

        Long userId = null;
        List<RelatedPersonIdentifierReadResponseDto> identifiers = null;
        Long id = null;
        RelatedPersonType type = null;
        String fullName = null;
        String phone = null;
        String email = null;
        String address = null;

        userId = relatedPersonUserProfileId( relatedPerson );
        identifiers = mapIdentifiersWithRelatedPersonId( relatedPerson.getIdentifiers() );
        id = relatedPerson.getId();
        type = relatedPerson.getType();
        fullName = relatedPerson.getFullName();
        phone = relatedPerson.getPhone();
        email = relatedPerson.getEmail();
        address = relatedPerson.getAddress();

        RelatedPersonReadResponseDto relatedPersonReadResponseDto = new RelatedPersonReadResponseDto( id, userId, type, fullName, phone, email, address, identifiers );

        return relatedPersonReadResponseDto;
    }

    @Override
    public RelatedPerson toRelatedPerson(RelatedPersonCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        RelatedPerson relatedPerson = new RelatedPerson();

        relatedPerson.setType( dto.type() );
        relatedPerson.setFullName( dto.fullName() );
        relatedPerson.setPhone( dto.phone() );
        relatedPerson.setEmail( dto.email() );
        relatedPerson.setAddress( dto.address() );

        return relatedPerson;
    }

    private Long relatedPersonUserProfileId(RelatedPerson relatedPerson) {
        if ( relatedPerson == null ) {
            return null;
        }
        UserProfile userProfile = relatedPerson.getUserProfile();
        if ( userProfile == null ) {
            return null;
        }
        Long id = userProfile.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
