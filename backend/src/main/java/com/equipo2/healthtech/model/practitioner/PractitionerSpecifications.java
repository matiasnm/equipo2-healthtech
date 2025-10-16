package com.equipo2.healthtech.model.practitioner;

import com.equipo2.healthtech.model.unavailability.Unavailability;
import org.springframework.data.jpa.domain.Specification;

import java.time.OffsetDateTime;

public class PractitionerSpecifications {

    public static Specification<Practitioner> hasRemote(Boolean remote) {
        return (root, query, cb) -> cb.equal(root.get("practitionerProfile").get("remote"), remote);
    }

    public static Specification<Practitioner> hasSpeciality(String code) {
        return (root, query, cb) -> cb.equal(root.get("practitionerRole").get("specialityCode").get("code"), code);
    }

    public static Specification<Practitioner> isAvailableBetween(OffsetDateTime start, OffsetDateTime end) {
        return (root, query, cb) -> {
            try {
                var subquery = query.subquery(Long.class);
                var u = subquery.from(Unavailability.class);
                subquery.select(u.get("id"))
                        .where(
                                cb.equal(u.get("practitioner"), root),
                                cb.lessThan(u.get("startTime"), end.toOffsetTime()),
                                cb.greaterThan(u.get("endTime"), start.toOffsetTime())
                        );

                return cb.not(cb.exists(subquery));

            } catch (IllegalStateException | NullPointerException e) {
                // Durante countQuery (por ejemplo, en findAll(Pageable)), subqueries no son soportadas
                return cb.conjunction();
            }
        };
    }
}