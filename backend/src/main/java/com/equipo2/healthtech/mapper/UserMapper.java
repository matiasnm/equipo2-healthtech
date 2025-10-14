package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserProfileMapper.class, PractitionerRoleMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUser(UserCreateRequestDto userDto);

    UserReadResponseDto toUserReadResponseDto(User user);

    List<UserReadResponseDto> toUserReadResponseDto(List<User> user);

    @Mapping(source = "userProfile", target = "practitionerProfile")
    @Mapping(source = "practitionerRole", target = "practitionerRole")
    PractitionerReadResponseDto toPractitionerReadResponseDto(Practitioner practitioner);

    @Mapping(source = "userProfile", target = "practitionerProfile")
    @Mapping(source = "practitionerRole", target = "practitionerRole")
    PractitionerReadSummaryResponseDto toPractitionerReadSummaryResponseDto(Practitioner practitioner);

    Patient toPatient(UserCreateRequestDto userDto);

    Practitioner toPractitioner(UserCreateRequestDto userDto);
}
