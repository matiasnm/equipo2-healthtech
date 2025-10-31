package com.equipo2.healthtech.service;

import com.equipo2.healthtech.model.appointment.Appointment;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public void notifyFrontend(String topic, Object message) {
        messagingTemplate.convertAndSend("/topic/" + topic, message);
    }

    public void notifyReschedule(Appointment appointment) {
        log.info("NOTIFY -> APPOINTMENT RESCHEDULE id: {}", appointment.getId());
        String msg = "APPOINTMENT RESCHEDULE id: " + appointment.getId();
        notifyFrontend("appointments/reschedule", msg);
    }

    public void notifyCancellation(Appointment appointment) {
        log.info("NOTIFY -> APPOINTMENT CANCELATION id: {}", appointment.getId());
        String msg = "APPOINTMENT CANCELATION id: " + appointment.getId();
        notifyFrontend("appointments/cancel", msg);
    }

    public void notifySchedule(Appointment appointment) {
        log.info("NOTIFY -> APPOINTMENT SCHEDULE id: {}", appointment.getId());
        String msg = "APPOINTMENT SCHEDULE id: " + appointment.getId();
        notifyFrontend("appointments/schedule", msg);
    }

    public void notifyUpcomingTomorrow(Appointment appointment) {
        log.info("NOTIFY -> APPOINTMENT UPCOMING TOMORROW id: {}", appointment.getId());
        String msg = "APPOINTMENT UPCOMING TOMORROW id: " + appointment.getId();
        notifyFrontend("appointments/upcoming", msg);
    }

    public void notifyUpcomingToday(Appointment appointment) {
        log.info("NOTIFY -> APPOINTMENT UPCOMING TODAY id: {}", appointment.getId());
        String msg = "APPOINTMENT UPCOMING TODAY id: " + appointment.getId();
        notifyFrontend("appointments/today", msg);
    }
}
