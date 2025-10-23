-- 1.a Practitioners profile table
CREATE TABLE practitioner_profiles (
    id BIGSERIAL PRIMARY KEY,
    experience INTEGER NOT NULL,
    studies VARCHAR(500),
    office_code VARCHAR(2),
    remote BOOLEAN NOT NULL DEFAULT TRUE
);

-- 1.b Practitioners table  (FK al profile)
CREATE TABLE practitioners (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    practitioner_profile_id BIGINT UNIQUE,
    CONSTRAINT fk_practitioner_profile
        FOREIGN KEY (practitioner_profile_id)
            REFERENCES practitioner_profiles(id)
            ON DELETE CASCADE
);

-- 2. Patients table
CREATE TABLE patients (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    practitioner_id BIGINT REFERENCES practitioners(user_id)
);

-- 3a. Practitioner role codes
CREATE TABLE practitioner_role_codes (
    id BIGSERIAL PRIMARY KEY,
    system TEXT NOT NULL,
    code VARCHAR(255) NOT NULL,
    display TEXT,
    definition TEXT
);

-- 3b. Speciality codes
CREATE TABLE practitioner_speciality_codes (
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
    speciality_code_id BIGINT NOT NULL REFERENCES practitioner_speciality_codes(id)
);

-- 5. Add role column to practitioners (nullable initially)
ALTER TABLE practitioners
    ADD COLUMN practitioner_role_id BIGINT REFERENCES practitioner_roles(id);

-- 6. Optional: index on role column
CREATE INDEX idx_practitioner_role_id ON practitioners(practitioner_role_id);

-- 7. Insert some common FHIR practitioner role codes
INSERT INTO practitioner_role_codes (system, code, display, definition) VALUES
    ('http://terminology.hl7.org/CodeSystem/practitioner-role', 'doctor', 'Doctor', 'A physician'),
    ('http://terminology.hl7.org/CodeSystem/practitioner-role', 'nurse', 'Nurse', 'A nurse'),
    ('http://terminology.hl7.org/CodeSystem/practitioner-role', 'pharmacist', 'Pharmacist', 'A pharmacist'),
    ('http://terminology.hl7.org/CodeSystem/practitioner-role', 'researcher', 'Researcher', 'A practitioner that may perform research'),
    ('http://terminology.hl7.org/CodeSystem/practitioner-role', 'teacher', 'Teacher/educator', 'Someone who is able to provide educational services'),
    ('http://terminology.hl7.org/CodeSystem/practitioner-role', 'ict pharmacist', 'ICT professional', 'A pharmacist');

INSERT INTO practitioner_speciality_codes (system, code, display, definition) VALUES
    ('http://snomed.info/sct', '408467006', 'Adult mental illness', ''),
    ('http://snomed.info/sct', '394577000', 'Anesthetics', ''),
    ('http://snomed.info/sct', '394578005', 'Audiological medicine', ''),
    ('http://snomed.info/sct', '421661004', 'Blood banking and transfusion medicine', ''),
    ('http://snomed.info/sct', '408462000', 'Burns care', ''),
    ('http://snomed.info/sct', '394579002', 'Cardiology', '');
