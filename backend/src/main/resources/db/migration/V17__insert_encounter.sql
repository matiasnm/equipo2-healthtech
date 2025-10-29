INSERT INTO encounters (
    encounter_status,
    encounter_class,
    reason_code_id,
    diagnosis_code_id,
    appointment_id,
    patient_id,
    notes,
    created_at,
    updated_at
) VALUES (
             'COMPLETED',
             'AMB',
             1,
             2,
             1,
             2,
             'Patient visited for routine check-up',
             now(),
             now()
         )
RETURNING id;