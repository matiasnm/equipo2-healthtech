CREATE OR REPLACE FUNCTION populate_practitioners()
    RETURNS void AS
$$
DECLARE
    i INT := 3;
    v_user_id BIGINT;
    v_profile_id BIGINT;
    v_practitioner_profile_id BIGINT;
    v_role_id BIGINT;
    v_full_name TEXT;
    v_office_code VARCHAR(2);

BEGIN
    WHILE i <= 22 LOOP
            INSERT INTO users (
                email, password, role, status, blocked, active, mfa_required,
                account_locked, credentials_expired, created_at, updated_at
            ) VALUES (
                         CONCAT('doctor', i, '@ht.com'),
                         '$2y$10$7VAu6lR5sV6a4giiaNXOiuGV5bv3vOu3324g.qIpaIwQM2rdo9O5S',
                         'PRACTITIONER', true, 0, true, false, false, false,
                         now(), now()
                     )
            RETURNING id INTO v_user_id;

            INSERT INTO practitioners (user_id) VALUES (v_user_id);

            v_full_name := CONCAT('Dr. Médico ', i);
            INSERT INTO user_profiles (user_id, full_name, gender, phone, address, birthday)
            VALUES (
                       v_user_id,
                       v_full_name,
                       CASE WHEN i % 2 = 0 THEN 'FEMALE' ELSE 'MALE' END,
                       CONCAT('555-0', LPAD(i::text, 3, '0')),
                       CONCAT('Clinic Street ', i),
                       ('1970-01-01'::date + (i * 300)::int)
                   )
            RETURNING id INTO v_profile_id;

            INSERT INTO identifiers (system, value, type, user_profile_id, related_person_id)
            VALUES
                ('http://ar.gov/dni', CONCAT('9000000', i), 'NATIONAL_ID', v_profile_id, NULL),
                ('http://passport.gov', CONCAT('P90000', i), 'PASSPORT', v_profile_id, NULL);

            v_office_code := CASE floor(random() * 4)::int
                                 WHEN 0 THEN 'A1'
                                 WHEN 1 THEN 'B2'
                                 WHEN 2 THEN 'A6'
                                 ELSE 'C5'
                END;

            INSERT INTO practitioner_profiles (experience, studies, office_code, remote)
            VALUES ((5 + i % 10), CONCAT('Universidad Nacional ', i), v_office_code, (i % 2 = 0))
            RETURNING id INTO v_practitioner_profile_id;

            UPDATE practitioners
            SET practitioner_profile_id = v_practitioner_profile_id
            WHERE user_id = v_user_id;

            INSERT INTO practitioner_roles (role_code_id, speciality_code_id)
            VALUES (1, i)
            RETURNING id INTO v_role_id;

            UPDATE practitioners
            SET practitioner_role_id = v_role_id
            WHERE user_id = v_user_id;

            INSERT INTO practitioner_unavailability (practitioner_id, day_of_week, start_time, end_time)
            VALUES
                (v_user_id, 'MONDAY', '12:00:00+00', '16:00:00+00'),
                (v_user_id, 'TUESDAY', '08:00:00+00', '12:00:00+00');

            RAISE NOTICE '✅ Médico % creado con especialidad %', i, i;
            i := i + 1;
        END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar función
SELECT populate_practitioners();

-- (Opcional) Eliminarla después
DROP FUNCTION populate_practitioners();