package com.equipo2.healthtech.dto;

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

public record MetadataResponseDto(
        ClinicReadResponseDto clinic,
        Role[] roles,
        IdentifierType[] identifierTypes,
        RelatedPersonType[] relatedPersonTypes,
        MediaType[] mediaTypes,
        EncounterStatus[] encounterStatuses,
        EncounterClass[] encounterClasses,
        AppointmentPriority[] appointmentPriority,
        AppointmentStatus[] appointmentStatuses,
        AppointmentChannel[] appointmentChannels,
        TransactionType[] transactionTypes
) {}