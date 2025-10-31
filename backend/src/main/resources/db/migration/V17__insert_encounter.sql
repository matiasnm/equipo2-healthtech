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
             3,
             5,
             1,
             2,
             'Patient attended for an annual routine check-up. Reports no acute complaints. Vital signs within normal limits. Physical examination unremarkable. Denies chest pain, dyspnea, abdominal discomfort, or urinary symptoms. Sleep and appetite normal. Preventive labs and vaccination status reviewed; patient encouraged to maintain balanced diet and regular physical activity. Follow-up visit scheduled in 12 months or sooner if symptoms arise.',
             now(),
             now()
         )
RETURNING id;