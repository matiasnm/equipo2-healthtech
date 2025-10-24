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
    ('http://snomed.info/sct', '394579002', 'Cardiology', 'Heart and cardiovascular specialty'),
    ('http://snomed.info/sct', '394582007', 'Dermatology', 'Skin specialty'),
    ('http://snomed.info/sct', '394584008', 'Gastroenterology', 'Digestive system specialty'),
    ('http://snomed.info/sct', '394583002', 'Endocrinology', 'Hormones and metabolism specialty'),
    ('http://snomed.info/sct', '394591006', 'Neurology', 'Nervous system specialty'),
    ('http://snomed.info/sct', '394585009', 'Obstetrics and gynecology', 'Women’s health specialty'),
    ('http://snomed.info/sct', '394589003', 'Nephrology', 'Kidney and urinary specialty'),
    ('http://snomed.info/sct', '394591006', 'Neurology', 'Brain and nerve specialty'),
    ('http://snomed.info/sct', '394587001', 'Psychiatry', 'Mental health specialty'),
    ('http://snomed.info/sct', '394801008', 'Trauma and orthopedics', 'Musculoskeletal injury and surgery specialty'),
    ('http://snomed.info/sct', '394612004', 'Urology', 'Urinary system and male reproductive organs'),
    ('http://snomed.info/sct', '394814009', 'General practice', 'Primary care and general medicine'),
    ('http://snomed.info/sct', '394802001', 'Nursing specialty', 'General nursing specialty'),
    ('http://snomed.info/sct', '722164005', 'Community health nursing', 'Focuses on public and community health'),
    ('http://snomed.info/sct', '722163004', 'Pediatric nursing', 'Nursing care for infants and children'),
    ('http://snomed.info/sct', '722162009', 'Geriatric nursing', 'Nursing care for elderly patients'),
    ('http://snomed.info/sct', '722165006', 'Oncology nursing', 'Nursing specialty focusing on cancer care'),
    ('http://snomed.info/sct', '722166007', 'Critical care nursing', 'Nursing care for intensive care patients'),
    ('http://snomed.info/sct', '722167003', 'Emergency nursing', 'Nursing care in emergency and trauma settings'),
    ('http://snomed.info/sct', '722168008', 'Surgical nursing', 'Perioperative and post-surgical nursing care'),
    ('http://snomed.info/sct', '722169000', 'Mental health nursing', 'Psychiatric and psychological nursing care'),
    ('http://snomed.info/sct', '722170004', 'Maternal and neonatal nursing', 'Nursing care for mothers and newborns');