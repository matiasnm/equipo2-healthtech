-- 1. Practitioners table
CREATE TABLE practitioners (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE
);

-- 2. Patients table
CREATE TABLE patients (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    practitioner_id BIGINT REFERENCES practitioners(user_id)
);

-- 3. Practitioner role codes
CREATE TABLE practitioner_role_codes (
    id BIGSERIAL PRIMARY KEY,
    system TEXT NOT NULL,
    code VARCHAR(255) NOT NULL,
    display TEXT,
    definition TEXT
);

-- 4. Practitioner roles
CREATE TABLE practitioner_roles (
    id BIGSERIAL PRIMARY KEY,
    role_code_id BIGINT NOT NULL REFERENCES practitioner_role_codes(id),
    speciality VARCHAR(255) NOT NULL
);

-- 5. Add role column to practitioners (nullable initially)
ALTER TABLE practitioners
    ADD COLUMN practitioner_role_id BIGINT REFERENCES practitioner_roles(id);

-- 6. Optional: index on role column
CREATE INDEX idx_practitioner_role_id ON practitioners(practitioner_role_id);

-- 7. Insert some common FHIR practitioner role codes
INSERT INTO practitioner_role_codes (system, code, display, definition) VALUES
    ('http://hl7.org/fhir/practitioner-role', 'doctor', 'Doctor', 'A physician'),
    ('http://hl7.org/fhir/practitioner-role', 'nurse', 'Nurse', 'A nurse'),
    ('http://hl7.org/fhir/practitioner-role', 'pharmacist', 'Pharmacist', 'A pharmacist');