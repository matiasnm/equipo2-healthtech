package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.user.UserUpdatePasswordRequestDto;
import com.equipo2.healthtech.exception.EmailAlreadyExistsException;
import com.equipo2.healthtech.exception.InvalidPasswordException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.IdentifierMapper;
import com.equipo2.healthtech.mapper.RelatedPersonMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.*;
import com.equipo2.healthtech.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
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
    public Long create(UserCreateRequestDto request) {
        if (userRepository.existsByEmail(request.email())) {
            throw EmailAlreadyExistsException.of(request.email());
        }
        User user;

        switch (request.role()) {
            case PATIENT -> {
                Patient patient = userMapper.toPatient(request);
                patient.setPassword(passwordEncoder.encode(request.password()));
                user = patientRepository.saveAndFlush(patient); // saves in users + patients table
            }
            case PRACTITIONER -> {
                Practitioner practitioner = userMapper.toPractitioner(request);
                practitioner.setPassword(passwordEncoder.encode(request.password()));
                user = practitionerRepository.saveAndFlush(practitioner); // saves in users + practitioners table
            }
            default -> {
                // plain User for other roles (ADMIN, SUPER_ADMIN, etc.)
                user = userMapper.toUser(request);
                user.setPassword(passwordEncoder.encode(request.password()));
                user = userRepository.saveAndFlush(user);
            }
        }
        return user.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public UserReadResponseDto read(Long id) {
        User authUser = securityUtils.getAuthenticatedUser();

        if (id == null || id.equals(authUser.getId())) {
            return userMapper.toUserReadResponseDto(authUser);
        }

        if (authUser.getRole() == Role.ADMIN || authUser.getRole() == Role.SUPER_ADMIN) {
            User user = getUser(id);
            return userMapper.toUserReadResponseDto(user);
        }
        throw new AccessDeniedException("Not allowed");
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public UserReadResponseDto read(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> NoResultsException.of(email));
        return userMapper.toUserReadResponseDto(user);
    }

    @Override
    public UserReadResponseDto readMe() {
        User authUser = securityUtils.getAuthenticatedUser();
        return userMapper.toUserReadResponseDto(authUser);
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
    public void updatePassword(UserUpdatePasswordRequestDto request) {
        User user = securityUtils.getAuthenticatedUser();
        if (user.getPassword().equals(request.oldPassword())) {
            throw InvalidPasswordException.of(user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.saveAndFlush(user);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        setInactive(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}