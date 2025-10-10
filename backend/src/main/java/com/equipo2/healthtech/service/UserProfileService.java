package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileUpdateRequestDto;

public interface UserProfileService {

    Long create(UserProfileCreateRequestDto request);
    UserProfileReadResponseDto read(Long id);
    void update(UserProfileUpdateRequestDto request);

}
