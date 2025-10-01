package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.user.UserUpdateRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Long createUser(UserCreateRequestDto request);
    UserReadResponseDto readUser(Long id);
    UserReadResponseDto readUser(String email);
    Page<UserReadResponseDto> readAll(Pageable pageable);
    void updateUser(UserUpdateRequestDto request, Long id);
    void deleteUser(Long id) ;
}