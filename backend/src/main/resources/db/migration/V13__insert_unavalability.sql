INSERT INTO practitioner_unavailability (practitioner_id, day_of_week, start_time, end_time)
VALUES
    -- Monday (1): 08:00–10:00
    (3, 'MONDAY', '11:00:00+00', '13:00:00+00'),

    -- Tuesday (2): 08:00–10:00
    (3, 'TUESDAY', '12:00:00+00', '14:00:00+00'),

    -- Friday (5): 15:00–18:00
    (3, 'FRIDAY', '11:00:00+00', '13:00:00+00');
