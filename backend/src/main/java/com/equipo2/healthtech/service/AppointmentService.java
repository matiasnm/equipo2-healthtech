package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.appointment.*;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerRoleReadResponseDto;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.OffsetDateTime;
import java.util.List;

public interface AppointmentService {

    public Long create(AppointmentCreateRequestDto request);

    public AppointmentReadDetailResponseDto read(Long id);

    public Page<AppointmentReadResponseDto> readAll(Pageable pageable);

    public void update(Long id, AppointmentUpdateRequestDto request);

    public void updateStatus(Long id, AppointmentStatus newStatus);

    public void delete(Long id);

    public boolean isPractitionerAvailable(Practitioner practitioner, OffsetDateTime start, OffsetDateTime end);

    public Practitioner getValidPractitioner(Long id);

    public List<PractitionerReadSummaryResponseDto> getAvailablePractitioners(AppointmentAvailabilityRequestDto request);

    public boolean canAccessAppointment(Appointment appointment);

    public Appointment getAppointment(Long id);

    public List<PractitionerRoleReadResponseDto> getAvailablePractitionerRoles();
}
