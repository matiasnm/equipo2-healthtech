CREATE TABLE encounter_codes (
    id BIGSERIAL PRIMARY KEY,
    system TEXT NOT NULL,
    code VARCHAR(255) NOT NULL,
    display TEXT,
    definition TEXT
);