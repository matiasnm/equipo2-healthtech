INSERT INTO practitioner_unavailability (practitioner_id, day_of_week, start_time, end_time)
VALUES
    -- Monday (1): 08:00–10:00
    (3, 1, '08:00:00+00', '10:00:00+00'),

    -- Tuesday (2): 08:00–10:00
    (3, 2, '08:00:00+00', '10:00:00+00'),

    -- Friday (5): 15:00–18:00
    (3, 5, '15:00:00+00', '18:00:00+00');
