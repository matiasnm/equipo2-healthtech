package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.identifier.IdentifierCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonCreateRequestDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.relatedperson.RelatedPersonReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileCreateRequestDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileIdentifierReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileUpdateRequestDto;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.exception.UserProfileAlreadyExistsException;
import com.equipo2.healthtech.mapper.IdentifierMapper;
import com.equipo2.healthtech.mapper.RelatedPersonMapper;
import com.equipo2.healthtech.mapper.UserProfileMapper;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.model.userProfile.Identifier;
import com.equipo2.healthtech.model.userProfile.RelatedPerson;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import com.equipo2.healthtech.repository.IdentifierRepository;
import com.equipo2.healthtech.repository.RelatedPersonRepository;
import com.equipo2.healthtech.repository.UserProfileRepository;
import com.equipo2.healthtech.repository.UserRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final UserProfileMapper userProfileMapper;
    private final SecurityUtils securityUtils;
    private final RelatedPersonRepository relatedPersonRepository;
    private final IdentifierRepository identifierRepository;
    private final RelatedPersonMapper relatedPersonMapper;
    private final IdentifierMapper identifierMapper;

    private UserProfile getUserProfile() {
        User user = securityUtils.getAuthenticatedUser();
        return userProfileRepository.findById(user.getId())
                .orElseThrow(() -> NoResultsException.of(user.getId()));
    }

    private UserProfile getUserProfile(Long id) {
        if (id == null) {
            throw NoResultsException.of("null");
        }
        return userProfileRepository.findById(id)
                .orElseThrow(() -> NoResultsException.of(id));
    }

    @Override
    public Long create(UserProfileCreateRequestDto request) {
        User user = securityUtils.getAuthenticatedUser();
        if (user.isStatus()) throw UserProfileAlreadyExistsException.of(user.getEmail());
        UserProfile userProfile = userProfileMapper.toUserProfile(request);
        userProfile.setUser(user);
        user.setUserProfile(userProfile);
        user.setStatus(true);
        UserProfile savedUserProfile = userProfileRepository.save(userProfile);
        userRepository.save(user);
        return savedUserProfile.getId();
    }

    @Override
    public UserProfileReadResponseDto read(Long id) {
        UserProfile userProfile = getUserProfile(id);
        return userProfileMapper.toUserProfileReadResponseDto(userProfile);

    }

    @Override
    @Transactional
    public void update(UserProfileUpdateRequestDto request) {
        User user = securityUtils.getAuthenticatedUser();
        UserProfile userProfile = user.getUserProfile();

        if (!user.isStatus() || userProfile == null) throw NoResultsException.of(user.getEmail());

        userProfile.setFullName(request.fullName());
        userProfile.setGender(request.gender());
        userProfile.setPhone(request.phone());
        userProfile.setAddress(request.address());
        userProfile.setBirthday(request.birthday());
        userProfileRepository.saveAndFlush(userProfile);
    }

    // *** RELATED PERSON & IDENTIFIERS ***

    @Override
    @Transactional
    public RelatedPersonReadResponseDto createRelatedPerson(RelatedPersonCreateRequestDto request) {
        User authUser = securityUtils.getAuthenticatedUser();
        UserProfile profile = authUser.getUserProfile();
        RelatedPerson relatedPerson = relatedPersonMapper.toRelatedPerson(request);
        relatedPerson.setUserProfile(profile);
        relatedPersonRepository.saveAndFlush(relatedPerson);
        return relatedPersonMapper.toRelatedPersonReadResponseDto(relatedPerson);
    }

    @Override
    @Transactional
    public void updateRelatedPerson(Long id, RelatedPersonCreateRequestDto request) {
        validateUserToRelatedPerson(id);
        RelatedPerson existing = relatedPersonRepository.findById(id)
                .orElseThrow(() -> new NoResultsException("RelatedPerson not found"));
        relatedPersonMapper.updateRelatedPersonFromDto(request, existing);
        relatedPersonRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteRelatedPerson(Long id) {
        validateUserToRelatedPerson(id);
        relatedPersonRepository.deleteById(id);
    }

    @Override
    @Transactional
    public UserProfileIdentifierReadResponseDto createUserProfileIdentifier(IdentifierCreateRequestDto request) {
        User authUser = securityUtils.getAuthenticatedUser();
        UserProfile profile = authUser.getUserProfile();
        Identifier identifier = identifierMapper.toIdentifier(request);
        identifier.setUserProfile(profile);
        identifierRepository.saveAndFlush(identifier);
        return identifierMapper.toUserProfileIdentifierReadResponseDto(identifier);
    }

    @Override
    @Transactional
    public RelatedPersonIdentifierReadResponseDto createRelatedPersonIdentifier(Long id, IdentifierCreateRequestDto request) {
        validateUserToRelatedPerson(id);
        RelatedPerson relatedPerson = relatedPersonRepository.findById(id)
                .orElseThrow(() -> new NoResultsException("RelatedPerson not found"));
        Identifier identifier = identifierMapper.toIdentifier(request);
        identifier.setRelatedPerson(relatedPerson);
        identifierRepository.saveAndFlush(identifier);
        return identifierMapper.toRelatedPersonIdentifierReadResponseDto(identifier);
    }

    @Override
    @Transactional
    public void deleteUserProfileIdentifier(Long id) {
        Identifier identifier = identifierRepository.findById(id)
                .orElseThrow(() -> new NoResultsException("Identifier not found"));
        validateUserToIdentifier(id);
        UserProfile userProfile = identifier.getUserProfile();
        if (userProfile != null) {
            userProfile.getIdentifiers().remove(identifier);
        }
        //relatedPersonRepository.deleteById(id); Hibernate will remove cause OrphanRemoval = true
    }

    @Override
    @Transactional
    public void deleteRelatedPersonIdentifier(Long id, Long identifierId) {
        validateUserToRelatedPerson(id);
        Identifier identifier = identifierRepository.findById(identifierId)
                .orElseThrow(() -> new NoResultsException("Identifier not found"));
        RelatedPerson relatedPerson = identifier.getRelatedPerson();
        if (relatedPerson == null || !relatedPerson.getId().equals(id)) {
            throw new AccessDeniedException("Identifier does not belong to this related person");
        }
        relatedPerson.getIdentifiers().remove(identifier);
        //identifierRepository.delete(identifier); Hibernate will remove cause OrphanRemoval = true
    }

    private void validateUserToIdentifier(Long identifierId) {
        User authUser = securityUtils.getAuthenticatedUser();
        List<Identifier> identifiers = Optional.ofNullable(authUser.getUserProfile().getIdentifiers())
                .orElse(Collections.emptyList());
        if (identifierId != null) {
            boolean hasIdentifier = identifiers.stream()
                    .anyMatch(id -> id.getId().equals(identifierId));
            if (!hasIdentifier) {
                throw new AccessDeniedException(
                        "You are not authorized to use this identifier ID: " + identifierId);
            }
        }
    }

    private void validateUserToRelatedPerson(Long relatedPersonId) {
        User authUser = securityUtils.getAuthenticatedUser();
        List<RelatedPerson> relatedPersons = Optional.ofNullable(authUser.getUserProfile().getRelatedPersons())
                .orElse(Collections.emptyList());
        if (relatedPersonId != null) {
            boolean hasRelatedPerson = relatedPersons.stream()
                    .anyMatch(rp -> rp.getId().equals(relatedPersonId));
            if (!hasRelatedPerson) {
                throw new AccessDeniedException(
                        "You are not authorized to use this related person ID: " + relatedPersonId);
            }
        }
    }
}