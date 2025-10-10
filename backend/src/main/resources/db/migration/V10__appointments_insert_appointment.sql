CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL REFERENCES patients(user_id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status appointment_status NOT NULL,
    teleconsultation_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    --google_event_id VARCHAR(255)
);

CREATE TABLE appointment_practitioners (
    appointment_id BIGINT NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    practitioner_id BIGINT NOT NULL REFERENCES practitioners(user_id) ON DELETE CASCADE,
    PRIMARY KEY (appointment_id, practitioner_id)
);


-- 1️⃣ Insert appointment
INSERT INTO appointments (patient_id, start_time, end_time, status, created_at, updated_at)
VALUES (2, now(), now() + interval '30 minutes', 'SCHEDULED', now(), now())
RETURNING id;

-- Suppose returned id = 1
-- 2️⃣ Link practitioner
INSERT INTO appointment_practitioners (appointment_id, practitioner_id)
VALUES (1, 3);
