package com.equipo2.healthtech.service;

import com.equipo2.healthtech.dto.appointment.AppointmentCreateRequestDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadDetailResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentReadResponseDto;
import com.equipo2.healthtech.dto.appointment.AppointmentUpdateRequestDto;
import com.equipo2.healthtech.dto.practitioner.PractitionerReadSummaryResponseDto;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
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

    public List<PractitionerReadSummaryResponseDto> getAvailablePractitioners(OffsetDateTime start, OffsetDateTime end);

    public boolean isPractitionerAvailable(Long id, OffsetDateTime start, OffsetDateTime end);
}
