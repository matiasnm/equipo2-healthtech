CREATE TABLE encounters (
    id BIGSERIAL PRIMARY KEY,
    encounter_status VARCHAR(50) NOT NULL,
    encounter_class VARCHAR(50) NOT NULL,
    reason_code_id BIGINT,
    diagnosis_code_id BIGINT,
    appointment_id BIGINT,
    patient_id BIGINT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_encounter_reason_code FOREIGN KEY (reason_code_id)
        REFERENCES encounter_codes(id) ON DELETE SET NULL,
    CONSTRAINT fk_encounter_diagnosis_code FOREIGN KEY (diagnosis_code_id)
        REFERENCES encounter_codes(id) ON DELETE SET NULL,
    CONSTRAINT fk_encounter_appointment FOREIGN KEY (appointment_id)
        REFERENCES appointments(id) ON DELETE SET NULL,
    CONSTRAINT fk_encounter_patient FOREIGN KEY (patient_id)
        REFERENCES patients(user_id) ON DELETE CASCADE
);

-- Indexes for faster lookups
CREATE INDEX idx_encounters_reason_code_id ON encounters(reason_code_id);
CREATE INDEX idx_encounters_diagnosis_code_id ON encounters(diagnosis_code_id);
CREATE INDEX idx_encounters_appointment_id ON encounters(appointment_id);
CREATE INDEX idx_encounters_patient_id ON encounters(patient_id);