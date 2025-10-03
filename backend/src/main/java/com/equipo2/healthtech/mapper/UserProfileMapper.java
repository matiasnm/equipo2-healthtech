package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.model.user.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = { RelatedPersonMapper.class, IdentifierMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserProfileMapper {

    UserProfile toUserProfile(UserProfileCreateRequestDto userProfileDto);
    UserProfileReadResponseDto toUserProfileReadResponseDto(UserProfile userProfile);
}
