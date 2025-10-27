package com.equipo2.healthtech.service;

import com.equipo2.healthtech.exception.ConflictAppointmentsException;
import com.equipo2.healthtech.model.appointment.Appointment;
import com.equipo2.healthtech.model.appointment.AppointmentPriority;
import com.equipo2.healthtech.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentManagerService {

    private final AppointmentRepository appointmentRepository;
    private final NotificationService notificationService;

    @Transactional
    public Appointment scheduleAppointment(Appointment newAppointment) {

        List<Appointment> conflicts = appointmentRepository.findConflicts(
                newAppointment.getPractitioners(),
                newAppointment.getStartTime(),
                newAppointment.getEndTime()
        );

        if (conflicts.isEmpty()) {
            return appointmentRepository.save(newAppointment);
        }

        if (newAppointment.getPriority().ordinal() >= AppointmentPriority.HIGH.ordinal()) {
            handleConflicts(newAppointment, conflicts);
            return appointmentRepository.save(newAppointment);
        }

        throw new ConflictAppointmentsException("Rescheduled Failed. No dates available.");
    }

    private void handleConflicts(Appointment highPriorityAppointment, List<Appointment> conflicts) {
        for (Appointment conflict : conflicts) {

            boolean sharePractitioner = conflict.getPractitioners().stream()
                    .anyMatch(highPriorityAppointment.getPractitioners()::contains);
            if (!sharePractitioner) continue;

            Optional<OffsetDateTime> newSlot = findNextAvailableSlot(conflict);
            if (newSlot.isPresent()) {
                conflict.setStartTime(newSlot.get());
                conflict.setEndTime(newSlot.get().plusMinutes(30));
                appointmentRepository.save(conflict);
                notificationService.notifyReschedule(conflict);
            } else {
                notificationService.notifyCancellation(conflict);
                appointmentRepository.delete(conflict);
            }
        }
    }

    private Optional<OffsetDateTime> findNextAvailableSlot(Appointment appointment) {
        OffsetDateTime candidate = appointment.getEndTime().plusMinutes(15);
        boolean free = appointmentRepository.findConflicts(
                appointment.getPractitioners(),
                candidate,
                candidate.plusMinutes(30)
        ).isEmpty();

        return free ? Optional.of(candidate) : Optional.empty();
    }
}