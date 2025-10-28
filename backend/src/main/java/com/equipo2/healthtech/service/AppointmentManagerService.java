package com.equipo2.healthtech.service;

import com.equipo2.healthtech.exception.ConflictAppointmentsException;
import com.equipo2.healthtech.exception.NoResultsException;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.equipo2.healthtech.model.appointment.AppointmentStatus;
import com.equipo2.healthtech.model.practitioner.Practitioner;
import com.equipo2.healthtech.model.practitioner.PractitionerSpecifications;
import com.equipo2.healthtech.model.user.User;
import com.equipo2.healthtech.repository.AppointmentRepository;
import com.equipo2.healthtech.repository.PractitionerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentManagerService {

    private final AppointmentRepository appointmentRepository;
    private final NotificationService notificationService;
    private final PractitionerRepository practitionerRepository;

    private void switchAppointments(Appointment appointment1, Appointment appointment2) {}
    private void shiftAppointment(Appointment appointment, Long hours) {}
    private void cancelAppointment(Appointment appointment) {}
    //private void scheduleAppointment(Appointment appointment) {}

    @Transactional
    public Appointment scheduleAppointment(Appointment newAppointment) {

        List<Appointment> conflicts = appointmentRepository.findConflicts(
                newAppointment.getPractitioners(),
                newAppointment.getStartTime(),
                newAppointment.getEndTime()
        );
        List<Long> conflictsIds = conflicts.stream().map(Appointment::getId).toList();

        log.info("APPOINTMENTS CONFLICTS -> Ids: {}", conflictsIds);

        if (conflicts.isEmpty()) {
            return appointmentRepository.save(newAppointment);
        }

        if (newAppointment.getPriority().ordinal() >= AppointmentPriority.HIGH.ordinal()) {
            handleConflicts(newAppointment, conflicts);
            return appointmentRepository.save(newAppointment);
        }

        throw new ConflictAppointmentsException("Scheduled Failed. No dates available.");
    }

    private void handleConflicts(Appointment highPriorityAppointment, List<Appointment> conflicts) {
        log.info("HANDLE PRIORITY -> {}", highPriorityAppointment.getPriority());
        for (Appointment conflict : conflicts) {

            boolean sharePractitioner = conflict.getPractitioners().stream()
                    .anyMatch(highPriorityAppointment.getPractitioners()::contains);
            if (!sharePractitioner) continue;

            Optional<OffsetDateTime> newSlot = findNextAvailableSlot(conflict);
            if (newSlot.isPresent()) {
                conflict.setStartTime(newSlot.get());
                conflict.setEndTime(newSlot.get().plusMinutes(30));
                appointmentRepository.save(conflict);
                log.info("APPOINTMENT RESCHEDULE -> Id: {}", conflict.getId());
                notificationService.notifyReschedule(conflict);
            } else {
                conflict.setStatus(AppointmentStatus.CANCELLED);
                log.info("APPOINTMENT STATUS -> Id: {}, {}", conflict.getId(), conflict.getStatus());
                notificationService.notifyCancellation(conflict);
                appointmentRepository.delete(conflict);
            }
        }
    }

    private Optional<OffsetDateTime> findNextAvailableSlot(Appointment appointment) {
        log.info("FIND NEXT AVAILABLE SLOT");
        OffsetDateTime candidate = appointment.getEndTime().plusMinutes(30);
        boolean free = appointmentRepository.findConflicts(
                appointment.getPractitioners(),
                candidate,
                candidate.plusMinutes(30)
        ).isEmpty();

        return free ? Optional.of(candidate) : Optional.empty();
    }
}