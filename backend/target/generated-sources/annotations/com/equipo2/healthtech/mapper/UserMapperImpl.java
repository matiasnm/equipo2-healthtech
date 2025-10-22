package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
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
public class UserMapperImpl implements UserMapper {

    @Autowired
    private UserProfileMapper userProfileMapper;
    @Autowired
    private PractitionerRoleMapper practitionerRoleMapper;

    @Override
    public User toUser(UserCreateRequestDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( userDto.email() );
        user.setPassword( userDto.password() );
        user.setRole( userDto.role() );

        return user;
    }

    @Override
    public UserReadResponseDto toUserReadResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String email = null;
        Role role = null;
        boolean status = false;
        UserProfileReadResponseDto userProfile = null;

        id = user.getId();
        email = user.getEmail();
        role = user.getRole();
        status = user.isStatus();
        userProfile = userProfileMapper.toUserProfileReadResponseDto( user.getUserProfile() );

        UserReadResponseDto userReadResponseDto = new UserReadResponseDto( id, email, role, status, userProfile );

        return userReadResponseDto;
    }

    @Override
    public List<UserReadResponseDto> toUserReadResponseDto(List<User> user) {
        if ( user == null ) {
            return null;
        }

        List<UserReadResponseDto> list = new ArrayList<UserReadResponseDto>( user.size() );
        for ( User user1 : user ) {
            list.add( toUserReadResponseDto( user1 ) );
        }

        return list;
    }

    @Override
    public PractitionerReadResponseDto toPractitionerReadResponseDto(Practitioner practitioner) {
        if ( practitioner == null ) {
            return null;
        }

        UserProfileReadResponseDto practitionerProfile = null;
        PractitionerRoleReadResponseDto practitionerRole = null;
        Long id = null;

        practitionerProfile = userProfileMapper.toUserProfileReadResponseDto( practitioner.getUserProfile() );
        practitionerRole = practitionerRoleMapper.toPractitionerRoleReadResponseDto( practitioner.getPractitionerRole() );
        id = practitioner.getId();

        PractitionerReadResponseDto practitionerReadResponseDto = new PractitionerReadResponseDto( id, practitionerProfile, practitionerRole );

        return practitionerReadResponseDto;
    }

    @Override
    public PractitionerReadSummaryResponseDto toPractitionerReadSummaryResponseDto(Practitioner practitioner) {
        if ( practitioner == null ) {
            return null;
        }

        UserProfileReadSummaryResponseDto practitionerProfile = null;
        PractitionerRoleReadResponseDto practitionerRole = null;
        Long id = null;

        practitionerProfile = userProfileMapper.toUserProfileReadSummaryResponseDto( practitioner.getUserProfile() );
        practitionerRole = practitionerRoleMapper.toPractitionerRoleReadResponseDto( practitioner.getPractitionerRole() );
        id = practitioner.getId();

        PractitionerReadSummaryResponseDto practitionerReadSummaryResponseDto = new PractitionerReadSummaryResponseDto( id, practitionerProfile, practitionerRole );

        return practitionerReadSummaryResponseDto;
    }

    @Override
    public Patient toPatient(UserCreateRequestDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        Patient patient = new Patient();

        patient.setEmail( userDto.email() );
        patient.setPassword( userDto.password() );
        patient.setRole( userDto.role() );

        return patient;
    }

    @Override
    public Practitioner toPractitioner(UserCreateRequestDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        Practitioner practitioner = new Practitioner();

        practitioner.setEmail( userDto.email() );
        practitioner.setPassword( userDto.password() );
        practitioner.setRole( userDto.role() );

        return practitioner;
    }
}
