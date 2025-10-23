CREATE TABLE practitioner_unavailability (
    id BIGSERIAL PRIMARY KEY,
    practitioner_id BIGINT NOT NULL,
    day_of_week VARCHAR(10) NOT NULL,
    start_time TIME WITH TIME ZONE NOT NULL,
    end_time TIME WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_practitioner_unavailability_practitioner
        FOREIGN KEY (practitioner_id)
            REFERENCES practitioners(user_id)
            ON DELETE CASCADE
);