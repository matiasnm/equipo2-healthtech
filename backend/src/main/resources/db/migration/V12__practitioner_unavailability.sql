CREATE TABLE practitioner_unavailability (
    id BIGSERIAL PRIMARY KEY,
    practitioner_id BIGINT NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME WITH TIME ZONE NOT NULL,
    end_time TIME WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_practitioner_unavailability_practitioner
        FOREIGN KEY (practitioner_id)
            REFERENCES practitioners(user_id)
            ON DELETE CASCADE
);