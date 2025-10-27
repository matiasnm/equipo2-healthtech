package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.user.UserUpdatePasswordRequestDto;
import com.equipo2.healthtech.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService {

    Long create(UserCreateRequestDto request);
    UserReadResponseDto read(Long id);
    UserReadResponseDto read(String email);
    UserReadResponseDto readMe();
    Page<UserReadResponseDto> readAll(Pageable pageable);
    void updatePassword(UserUpdatePasswordRequestDto request);
    void delete(Long id) ;
    Optional<User> findUserByEmail(String email);
}