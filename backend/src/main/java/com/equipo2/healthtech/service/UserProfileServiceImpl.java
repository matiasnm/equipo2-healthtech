package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileUpdateRequestDto;
import com.equipo2.healthtech.exception.EmailAlreadyExistsException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.exception.UserProfileAlreadyExistsException;
import com.equipo2.healthtech.mapper.UserProfileMapper;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.model.user.UserProfile;
import com.equipo2.healthtech.repository.UserProfileRepository;
import com.equipo2.healthtech.repository.UserRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final UserProfileMapper userProfileMapper;
    private final SecurityUtils securityUtils;

    private UserProfile getUserProfile() throws NoResultsException {
        User user = securityUtils.getAuthenticatedUser();
        return userProfileRepository.findById(user.getId())
                .orElseThrow(() -> NoResultsException.of(user.getId()));
    }

    private UserProfile getUserProfile(Long id) throws NoResultsException {
        if (id == null) {
            throw NoResultsException.of("null");
        }
        return userProfileRepository.findById(id)
                .orElseThrow(() -> NoResultsException.of(id));
    }

    @Override
    public Long createUserProfile(@Valid UserProfileCreateRequestDto request) {
        User user = securityUtils.getAuthenticatedUser();
        if (user.isStatus()) throw UserProfileAlreadyExistsException.of(user.getEmail());
        UserProfile userProfile = userProfileMapper.toUserProfile(request);
        UserProfile savedUserProfile = userProfileRepository.save(userProfile);
        user.setStatus(true);
        userRepository.save(user);
        return savedUserProfile.getId();
    }

    @Override
    public UserProfileReadResponseDto readUserProfile(Long id) {
        UserProfile userProfile = getUserProfile(id);
        return userProfileMapper.toUserProfileReadResponseDto(userProfile);

    }

    @Override
    @Transactional
    public void updateUserProfile(@Valid UserProfileUpdateRequestDto request) {
        User user = securityUtils.getAuthenticatedUser();
        UserProfile userProfile = user.getUserProfile();

        if (!user.isStatus() || userProfile == null) throw NoResultsException.of(user.getEmail());

        userProfile.setFullName(request.fullName());
        userProfile.setPhone(request.phone());
        userProfile.setAddress(request.address());
        userProfile.setBirthday(request.birthday());
        userProfileRepository.saveAndFlush(userProfile);
    }

}