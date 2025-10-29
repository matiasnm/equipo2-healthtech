package com.equipo2.healthtech.model.practitioner;

import com.equipo2.healthtech.model.unavailability.Unavailability;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

import java.time.*;
import java.time.temporal.ChronoUnit;

@Slf4j
public class PractitionerSpecifications {

    public static Specification<Practitioner> isActiveAndConfigured() {
        return (root, query, cb) -> cb.and(
                cb.isTrue(root.get("status")),
                cb.isNotNull(root.get("practitionerProfile")),
                cb.isNotNull(root.get("practitionerRole"))
        );
    }

    public static Specification<Practitioner> hasRemote(Boolean remote) {
        return (root, query, cb) -> cb.equal(root.get("practitionerProfile").get("remote"), remote);
    }

    public static Specification<Practitioner> hasSpeciality(String code) {
        return (root, query, cb) -> cb.equal(root.get("practitionerRole").get("specialityCode").get("code"), code);
    }

    public static Specification<Practitioner> isAvailableBetween(OffsetDateTime startTime, OffsetDateTime endTime) {
        return (root, query, cb) -> {
            if (startTime == null || endTime == null) return cb.conjunction();

            // UTC
            OffsetDateTime startUtc = startTime.withOffsetSameInstant(ZoneOffset.UTC).truncatedTo(ChronoUnit.MINUTES);
            OffsetDateTime endUtc = endTime.withOffsetSameInstant(ZoneOffset.UTC).truncatedTo(ChronoUnit.MINUTES);

            DayOfWeek dayOfWeek = startUtc.getDayOfWeek();
            OffsetTime startUtcTime = startUtc.toOffsetTime();
            OffsetTime endUtcTime = endUtc.toOffsetTime();

            log.info("DAY OF WEEK: {}", dayOfWeek);
            log.info("START TIME UTC: {}", startUtcTime);
            log.info("END TIME UTC: {}", endUtcTime);

            // Unavailability Subquery
            Subquery<Long> sub = query.subquery(Long.class);
            Root<Unavailability> unav = sub.from(Unavailability.class);

            sub.select(unav.get("practitioner").get("id"))
                    .where(
                            cb.equal(unav.get("practitioner").get("id"), root.get("id")),
                            cb.equal(unav.get("dayOfWeek"), dayOfWeek),
                            cb.lessThan(unav.get("startTime"), endUtcTime),
                            cb.greaterThan(unav.get("endTime"), startUtcTime)
                    );

            // Practitioners whom *DO NOT* have Unavailability in that hours.
            return cb.not(cb.exists(sub));
        };
    }
}