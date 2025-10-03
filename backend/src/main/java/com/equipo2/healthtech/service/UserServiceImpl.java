package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.user.UserUpdatePasswordRequestDto;
import com.equipo2.healthtech.exception.EmailAlreadyExistsException;
import com.equipo2.healthtech.exception.InvalidPasswordException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.UserRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final SecurityUtils securityUtils;

    private void setInactive(Long id) {
        User user = getUser(id);
        user.setActive(false);
        userRepository.saveAndFlush(user);
    }

    private void setActive(Long id) {
        User user = getUser(id);
        user.setActive(true);
        userRepository.saveAndFlush(user);
    }

    private User getUser(Long id) throws NoResultsException {
        if (id == null) {
            throw NoResultsException.of("null");
        }
        return userRepository.findById(id)
                .orElseThrow(() -> NoResultsException.of(id));
    }

    @Override
    @Transactional
    public Long createUser(@Valid UserCreateRequestDto request) {
        if (userRepository.existsByEmail(request.email())) {
            throw EmailAlreadyExistsException.of(request.email());
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public UserReadResponseDto readUser() {
        User user = getUser(securityUtils.getAuthenticatedUser().getId());
        UserReadResponseDto dto = userMapper.toUserReadResponseDto(user);
        return userMapper.toUserReadResponseDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public UserReadResponseDto readUser(Long id) {
        User user = getUser(id);
        return userMapper.toUserReadResponseDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public UserReadResponseDto readUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> NoResultsException.of(email));
        return userMapper.toUserReadResponseDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public Page<UserReadResponseDto> readAll(Pageable pageable) {
        Sort sort = pageable.getSort().isSorted() ? pageable.getSort() : Sort.by("fullName").ascending();
        Page<User> users = userRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort));
        if (users.getContent().isEmpty()) {
            return Page.empty();
        }
        return users.map(userMapper::toUserReadResponseDto);
    }

    @Override
    @Transactional
    public void updatePassword(@Valid UserUpdatePasswordRequestDto request) {
        User user = securityUtils.getAuthenticatedUser();
        if (user.getPassword().equals(request.oldPassword())) {
            throw InvalidPasswordException.of(user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.saveAndFlush(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        setInactive(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}