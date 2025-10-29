package com.equipo2.healthtech.controller;

import com.equipo2.healthtech.dto.MetadataResponseDto;
import com.equipo2.healthtech.dto.clinic.ClinicReadResponseDto;
import com.equipo2.healthtech.model.account.TransactionType;
import com.equipo2.healthtech.model.appointment.AppointmentChannel;
import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import com.equipo2.healthtech.model.encounter.EncounterClass;
import com.equipo2.healthtech.model.encounter.EncounterStatus;
import com.equipo2.healthtech.model.user.Role;
import com.equipo2.healthtech.model.userProfile.IdentifierType;
import com.equipo2.healthtech.model.userProfile.MediaType;
import com.equipo2.healthtech.model.userProfile.RelatedPersonType;
import com.equipo2.healthtech.service.ClinicService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/metadata")
@AllArgsConstructor
@Slf4j
@Tag(name = "8️⃣ Metadata")
public class MetadataController {

    private final ClinicService metadatacService;

    @GetMapping
    public ResponseEntity<MetadataResponseDto> getMetadata() {
        ClinicReadResponseDto clinicDto = metadatacService.read(1L);
        MetadataResponseDto response = new MetadataResponseDto(
                clinicDto,
                Role.values(),
                IdentifierType.values(),
                RelatedPersonType.values(),
                MediaType.values(),
                EncounterStatus.values(),
                EncounterClass.values(),
                AppointmentPriority.values(),
                AppointmentStatus.values(),
                AppointmentChannel.values(),
                TransactionType.values()
        );
        return ResponseEntity.ok(response);
    }
}