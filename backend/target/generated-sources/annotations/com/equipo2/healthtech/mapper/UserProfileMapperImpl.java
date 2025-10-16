package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.relatedperson.RelatedPersonReadResponseDto;
import com.equipo2.healthtech.dto.user.UserIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.model.userProfile.Identifier;
import com.equipo2.healthtech.model.userProfile.RelatedPerson;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-14T09:46:46-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Autowired
    private RelatedPersonMapper relatedPersonMapper;
    @Autowired
    private IdentifierMapper identifierMapper;

    @Override
    public UserProfile toUserProfile(UserProfileCreateRequestDto userProfileDto) {
        if ( userProfileDto == null ) {
            return null;
        }

        UserProfile userProfile = new UserProfile();

        userProfile.setFullName( userProfileDto.fullName() );
        userProfile.setGender( userProfileDto.gender() );
        userProfile.setPhone( userProfileDto.phone() );
        userProfile.setAddress( userProfileDto.address() );
        userProfile.setBirthday( userProfileDto.birthday() );

        return userProfile;
    }

    @Override
    public UserProfileReadResponseDto toUserProfileReadResponseDto(UserProfile userProfile) {
        if ( userProfile == null ) {
            return null;
        }

        Long id = null;
        String fullName = null;
        String phone = null;
        String address = null;
        String gender = null;
        LocalDate birthday = null;
        List<UserIdentifierReadResponseDto> identifiers = null;
        List<RelatedPersonReadResponseDto> relatedPersons = null;

        id = userProfile.getId();
        fullName = userProfile.getFullName();
        phone = userProfile.getPhone();
        address = userProfile.getAddress();
        gender = userProfile.getGender();
        birthday = userProfile.getBirthday();
        identifiers = identifierListToUserIdentifierReadResponseDtoList( userProfile.getIdentifiers() );
        relatedPersons = relatedPersonListToRelatedPersonReadResponseDtoList( userProfile.getRelatedPersons() );

        UserProfileReadResponseDto userProfileReadResponseDto = new UserProfileReadResponseDto( id, fullName, phone, address, gender, birthday, identifiers, relatedPersons );

        return userProfileReadResponseDto;
    }

    @Override
    public UserProfileReadSummaryResponseDto toUserProfileReadSummaryResponseDto(UserProfile userProfile) {
        if ( userProfile == null ) {
            return null;
        }

        Long id = null;
        String fullName = null;
        String gender = null;
        String phone = null;
        String address = null;
        LocalDate birthday = null;

        id = userProfile.getId();
        fullName = userProfile.getFullName();
        gender = userProfile.getGender();
        phone = userProfile.getPhone();
        address = userProfile.getAddress();
        birthday = userProfile.getBirthday();

        UserProfileReadSummaryResponseDto userProfileReadSummaryResponseDto = new UserProfileReadSummaryResponseDto( id, fullName, gender, phone, address, birthday );

        return userProfileReadSummaryResponseDto;
    }

    protected List<UserIdentifierReadResponseDto> identifierListToUserIdentifierReadResponseDtoList(List<Identifier> list) {
        if ( list == null ) {
            return null;
        }

        List<UserIdentifierReadResponseDto> list1 = new ArrayList<UserIdentifierReadResponseDto>( list.size() );
        for ( Identifier identifier : list ) {
            list1.add( identifierMapper.toUserIdentifierReadResponseDto( identifier ) );
        }

        return list1;
    }

    protected List<RelatedPersonReadResponseDto> relatedPersonListToRelatedPersonReadResponseDtoList(List<RelatedPerson> list) {
        if ( list == null ) {
            return null;
        }

        List<RelatedPersonReadResponseDto> list1 = new ArrayList<RelatedPersonReadResponseDto>( list.size() );
        for ( RelatedPerson relatedPerson : list ) {
            list1.add( relatedPersonMapper.toRelatedPersonReadResponseDto( relatedPerson ) );
        }

        return list1;
    }
}
