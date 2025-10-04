package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileUpdateRequestDto;

public interface UserProfileService {

    Long createUserProfile(UserProfileCreateRequestDto request);
    UserProfileReadResponseDto readUserProfile(Long id);
    void updateUserProfile(UserProfileUpdateRequestDto request);

}
