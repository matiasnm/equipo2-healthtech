package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.user.UserCreateRequestDto;
import com.equipo2.healthtech.dto.user.UserReadResponseDto;
import com.equipo2.healthtech.dto.user.UserUpdateRequestDto;
import com.equipo2.healthtech.exception.EmailAlreadyExistsException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper mapper;

    private void setInactive(Long id) {
        User user = getUser(id);
        user.setActive(false);
        repository.saveAndFlush(user);
    }

    private void setActive(Long id) {
        User user = getUser(id);
        user.setActive(true);
        repository.saveAndFlush(user);
    }

    private User getUser(Long id) throws NoResultsException {
        if (id == null) {
            throw NoResultsException.of("null");
        }
        return repository.findById(id)
                .orElseThrow(() -> NoResultsException.of(id));
    }

    @Override
    @Transactional
    public Long createUser(UserCreateRequestDto request) {
        if (repository.existsByEmail(request.email())) {
            throw EmailAlreadyExistsException.of(request.email());
        }
        User user = mapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        User savedUser = repository.save(user);
        return savedUser.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public UserReadResponseDto readUser(Long id) {
        User user = getUser(id);
        return mapper.toUserDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserReadResponseDto readUser(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> NoResultsException.of(email));
        return mapper.toUserDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserReadResponseDto> readAll(Pageable pageable) {
        Page<User> users = repository.findAll(PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                pageable.getSortOr(Sort.by(Sort.Direction.ASC, "name")))
        );
        if (users.getContent().isEmpty()) {
            return Page.empty();
        }
        return users.map(mapper::toUserDto);
    }

    @Override
    @Transactional
    public void updateUser(UserUpdateRequestDto request, Long id) {
        User user = getUser(id);
        if (!user.getEmail().equals(request.email())
                && repository.existsByEmail(request.email())) {
            throw EmailAlreadyExistsException.of(request.email());
        }
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setFirstName(request.firstName());
        repository.saveAndFlush(user);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        setInactive(id);
    }

}
