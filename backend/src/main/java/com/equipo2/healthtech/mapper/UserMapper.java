package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.model.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = { UserProfileMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUser(UserCreateRequestDto userDto);
    UserReadResponseDto toUserReadResponseDto(User user);
    List<UserReadResponseDto> toUserReadResponseDto(List<User> user);

}
