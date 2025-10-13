package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.practitioner.PractitionerReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.mapper.PractitionerRoleMapper;
import com.equipo2.healthtech.mapper.UserMapper;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerRole;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.PractitionerRepository;
import com.equipo2.healthtech.repository.PractitionerRoleCodeRepository;
import com.equipo2.healthtech.repository.PractitionerRoleRepository;
import com.equipo2.healthtech.repository.SpecialityCodeRepository;
import com.equipo2.healthtech.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
@Slf4j
public class PractitionerServiceImpl implements PractitionerService{

    private final PractitionerRepository practitionerRepository;
    private final PractitionerRoleRepository practitionerRoleRepository;
    private final PractitionerRoleCodeRepository roleCodeRepository;
    private final SpecialityCodeRepository specialityCodeRepository;
    private final PractitionerRoleMapper practitionerRoleMapper;
    private final UserMapper userMapper;
    private final SecurityUtils securityUtils;

    private Practitioner getPractitioner(Long id) {
        if (id == null) throw NoResultsException.of("null");
        return practitionerRepository.findById(id)
                .orElseThrow(() -> NoResultsException.of("Practitioner not found for id: " + id));
    }

    private boolean isAdmin(User user) {
        return user.getRole() == Role.ADMIN || user.getRole() == Role.SUPER_ADMIN;
    }

    @Override
    public PractitionerReadResponseDto read(Long id) {
        User authUser = securityUtils.getAuthenticatedUser();
        Practitioner practitioner = getPractitioner(id);
        if (!isAdmin(authUser)) {
            throw new AccessDeniedException("You are not allowed to view Practitioners");
        }
        return userMapper.toPractitionerReadResponseDto(practitioner);
    }

    @Override
    public PractitionerReadResponseDto readMe() {
        User authUser = securityUtils.getAuthenticatedUser();
        if (authUser == null) {
            throw new AccessDeniedException("User not authenticated");
        }

        if (!(authUser instanceof Practitioner practitioner)) {
            throw new AccessDeniedException("User is not a practitioner");
        }
        return userMapper.toPractitionerReadResponseDto(practitioner);
    }

    @Override
    public Page<PractitionerReadSummaryResponseDto> readAllActive(Pageable pageable) {
        Sort sort = pageable.getSort().isUnsorted()
                ? Sort.by("userProfile.fullName").ascending()
                : pageable.getSort();

        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                sort
        );

        Page<Practitioner> practitioners = practitionerRepository.
                findAllByStatusIsTrueAndPractitionerRoleIsNotNull(sortedPageable);
        if (practitioners.isEmpty()) {
            return Page.empty();
        }
        return practitioners.map(userMapper::toPractitionerReadSummaryResponseDto);
    }

    @Override
    public PractitionerRoleReadResponseDto createPractitionerRole(Long id, PractitionerRoleCreateRequestDto request) {
        Practitioner practitioner = getPractitioner(id);
        PractitionerRole role = createRole(request);
        practitioner.setPractitionerRole(role);
        practitionerRepository.save(practitioner);
        log.info("CREATE -> PRACTITIONER ROL, CODES: {}, {}", role.getRoleCode(), role.getSpecialityCode());
        log.info("      |-> PRACTITIONER ID: {}", id);
        return practitionerRoleMapper.toPractitionerRoleReadResponseDto(role);
    }

    private PractitionerRole createRole(PractitionerRoleCreateRequestDto request) {
        var roleCode = roleCodeRepository.findById(request.roleCodeId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid role code id"));
        var specialityCode = specialityCodeRepository.findById(request.specialityCodeId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid speciality code id"));

        PractitionerRole role = new PractitionerRole();
        role.setRoleCode(roleCode);
        role.setSpecialityCode(specialityCode);
        return practitionerRoleRepository.save(role);
    }
}
