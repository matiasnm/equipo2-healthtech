package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.practitioner.CodeableConceptReadDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleCreateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.model.practitioner.PractitionerRole;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleCode;
import com.equipo2.healthtech.model.practitioner.PractitionerRoleSpecialityCode;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-14T09:46:46-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class PractitionerRoleMapperImpl implements PractitionerRoleMapper {

    @Override
    public PractitionerRole toPractitionerRole(PractitionerRoleCreateRequestDto request) {
        if ( request == null ) {
            return null;
        }

        PractitionerRole practitionerRole = new PractitionerRole();

        return practitionerRole;
    }

    @Override
    public PractitionerRoleReadResponseDto toPractitionerRoleReadResponseDto(PractitionerRole practitionerRole) {
        if ( practitionerRole == null ) {
            return null;
        }

        CodeableConceptReadDto roleCode = null;
        CodeableConceptReadDto specialityCode = null;

        roleCode = toCodeableConceptReadDto( practitionerRole.getRoleCode() );
        specialityCode = toCodeableConceptReadDto( practitionerRole.getSpecialityCode() );

        PractitionerRoleReadResponseDto practitionerRoleReadResponseDto = new PractitionerRoleReadResponseDto( roleCode, specialityCode );

        return practitionerRoleReadResponseDto;
    }

    @Override
    public CodeableConceptReadDto toCodeableConceptReadDto(PractitionerRoleCode code) {
        if ( code == null ) {
            return null;
        }

        String system = null;
        String code1 = null;
        String display = null;
        String definition = null;

        system = code.getSystem();
        code1 = code.getCode();
        display = code.getDisplay();
        definition = code.getDefinition();

        CodeableConceptReadDto codeableConceptReadDto = new CodeableConceptReadDto( system, code1, display, definition );

        return codeableConceptReadDto;
    }

    @Override
    public CodeableConceptReadDto toCodeableConceptReadDto(PractitionerRoleSpecialityCode code) {
        if ( code == null ) {
            return null;
        }

        String system = null;
        String code1 = null;
        String display = null;
        String definition = null;

        system = code.getSystem();
        code1 = code.getCode();
        display = code.getDisplay();
        definition = code.getDefinition();

        CodeableConceptReadDto codeableConceptReadDto = new CodeableConceptReadDto( system, code1, display, definition );

        return codeableConceptReadDto;
    }
}
