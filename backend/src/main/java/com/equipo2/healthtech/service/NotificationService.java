package com.equipo2.healthtech.service;

import com.equipo2.healthtech.model.appointment.Appointment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NotificationService {

    public void notifyReschedule(Appointment conflict) {
        log.info("NOTIFY -> APPOINTMENT RESCHEDULE id: {}", conflict.getId());
    }

    public void notifyCancellation(Appointment conflict) {
        log.info("NOTIFY -> APPOINTMENT CANCELATION id: {}", conflict.getId());
    }
}
