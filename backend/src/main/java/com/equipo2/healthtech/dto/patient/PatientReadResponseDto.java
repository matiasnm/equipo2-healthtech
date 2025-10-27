package com.equipo2.healthtech.dto.patient;

import com.equipo2.healthtech.dto.appointment.AppointmentReadResponseDto;
import com.equipo2.healthtech.dto.encounter.EncounterReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;

import java.util.List;

public class PatientReadResponseDto {
    Long id;
    UserProfileReadSummaryResponseDto patientProfile;
    PractitionerReadSummaryResponseDto generalPractitioner;
    //List<AppointmentReadResponseDto> appointments;
    //List<EncounterReadResponseDto> encounters;
}
