package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.CodeableConceptReadDto;
import com.equipo2.healthtech.mapper.EncounterMapper;
import com.equipo2.healthtech.mapper.PractitionerRoleMapper;
import com.equipo2.healthtech.model.encounter.EncounterCode;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleCode;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleSpecialityCode;
import com.equipo2.healthtech.repository.EncounterCodeRepository;
import com.equipo2.healthtech.repository.PractitionerRoleCodeRepository;
import com.equipo2.healthtech.repository.PractitionerSpecialityCodeRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/codes")
@RequiredArgsConstructor
@Tag(name = "7️⃣ Codes")
public class CodeController {

    private final PractitionerRoleCodeRepository practitionerRoleCodeRepository;
    private final PractitionerSpecialityCodeRepository practitionerSpecialityCodeRepository;
    private final EncounterCodeRepository encounterCodeRepository;
    private final PractitionerRoleMapper practitionerRoleMapper;
    private final EncounterMapper encounterMapper;

    @GetMapping("/practitioner-role")
    public Page<CodeableConceptReadDto> getPractitionerRoleCodes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PractitionerRoleCode> result = (search != null && !search.isBlank())
                ? practitionerRoleCodeRepository.findByDisplayContainingIgnoreCase(search, pageable)
                : practitionerRoleCodeRepository.findAll(pageable);
        return result.map(practitionerRoleMapper::toCodeableConceptReadDto);
    }

    @GetMapping("/practitioner-speciality")
    public Page<CodeableConceptReadDto> getPractitionerSpecialityCodes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PractitionerRoleSpecialityCode> result = (search != null && !search.isBlank())
                ? practitionerSpecialityCodeRepository.findByDisplayContainingIgnoreCase(search, pageable)
                : practitionerSpecialityCodeRepository.findAll(pageable);
        return result.map(practitionerRoleMapper::toCodeableConceptReadDto);
    }

    @GetMapping("/encounter-reason-diagnosis")
    public Page<CodeableConceptReadDto> getEncounterCodes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<EncounterCode> result = (search != null && !search.isBlank())
                ? encounterCodeRepository.findByDisplayContainingIgnoreCase(search, pageable)
                : encounterCodeRepository.findAll(pageable);
        return result.map(encounterMapper::toCodeableConceptReadDto);
    }
}
