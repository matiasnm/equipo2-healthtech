package com.equipo2.healthtech.mapper;

import com.equipo2.healthtech.dto.appointment.AppointmentCreateRequestDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadDetailResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.userprofile.UserProfileReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import com.equipo2.healthtech.model.patient.Patient;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.userProfile.UserProfile;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-14T09:46:46-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Autowired
    private UserProfileMapper userProfileMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public AppointmentReadResponseDto toAppointmentReadResponseDto(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        Long patientId = null;
        List<Long> practitionerIds = null;
        Long id = null;
        OffsetDateTime startTime = null;
        OffsetDateTime endTime = null;
        AppointmentStatus status = null;
        String teleconsultationUrl = null;

        patientId = appointmentPatientId( appointment );
        practitionerIds = mapPractitionersToIds( appointment.getPractitioners() );
        id = appointment.getId();
        startTime = appointment.getStartTime();
        endTime = appointment.getEndTime();
        status = appointment.getStatus();
        teleconsultationUrl = appointment.getTeleconsultationUrl();

        AppointmentReadResponseDto appointmentReadResponseDto = new AppointmentReadResponseDto( id, patientId, practitionerIds, startTime, endTime, status, teleconsultationUrl );

        return appointmentReadResponseDto;
    }

    @Override
    public AppointmentReadDetailResponseDto toAppointmentReadDetailResponseDto(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        UserProfileReadSummaryResponseDto patientProfile = null;
        List<PractitionerReadSummaryResponseDto> practitioners = null;
        Long id = null;
        OffsetDateTime startTime = null;
        OffsetDateTime endTime = null;
        AppointmentStatus status = null;
        String teleconsultationUrl = null;

        patientProfile = userProfileMapper.toUserProfileReadSummaryResponseDto( appointmentPatientUserProfile( appointment ) );
        practitioners = practitionerListToPractitionerReadSummaryResponseDtoList( appointment.getPractitioners() );
        id = appointment.getId();
        startTime = appointment.getStartTime();
        endTime = appointment.getEndTime();
        status = appointment.getStatus();
        teleconsultationUrl = appointment.getTeleconsultationUrl();

        AppointmentReadDetailResponseDto appointmentReadDetailResponseDto = new AppointmentReadDetailResponseDto( id, patientProfile, practitioners, startTime, endTime, status, teleconsultationUrl );

        return appointmentReadDetailResponseDto;
    }

    @Override
    public Appointment toAppointment(AppointmentCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        Appointment appointment = new Appointment();

        appointment.setPatient( mapPatient( dto.patientId() ) );
        appointment.setPractitioners( mapPractitioners( dto.practitionerIds() ) );
        appointment.setStartTime( dto.startTime() );
        appointment.setEndTime( dto.endTime() );

        return appointment;
    }

    private Long appointmentPatientId(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Patient patient = appointment.getPatient();
        if ( patient == null ) {
            return null;
        }
        Long id = patient.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private UserProfile appointmentPatientUserProfile(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }
        Patient patient = appointment.getPatient();
        if ( patient == null ) {
            return null;
        }
        UserProfile userProfile = patient.getUserProfile();
        if ( userProfile == null ) {
            return null;
        }
        return userProfile;
    }

    protected List<PractitionerReadSummaryResponseDto> practitionerListToPractitionerReadSummaryResponseDtoList(List<Practitioner> list) {
        if ( list == null ) {
            return null;
        }

        List<PractitionerReadSummaryResponseDto> list1 = new ArrayList<PractitionerReadSummaryResponseDto>( list.size() );
        for ( Practitioner practitioner : list ) {
            list1.add( userMapper.toPractitionerReadSummaryResponseDto( practitioner ) );
        }

        return list1;
    }
}
