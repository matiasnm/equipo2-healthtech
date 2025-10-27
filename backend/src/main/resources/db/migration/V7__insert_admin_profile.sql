INSERT INTO user_profiles (user_id, full_name, gender, phone, address, birthday)
VALUES (1, 'Admin Admin', 'Degenerado', '123456789', 'Admin Street 1', '1980-01-01')
RETURNING id;

INSERT INTO identifiers (system, value, type, user_profile_id, related_person_id)
VALUES
    ('http://ar.gov/dni', '12345678', 'NATIONAL_ID', 1, NULL),
    ('http://passport.gov', 'A1234567', 'PASSPORT', 1, NULL);

INSERT INTO related_persons (type, full_name, phone, email, address, user_id)
VALUES
    ('DESIGNATED_REPRESENTATIVE', 'John Doe', '987654321', 'john.doe@example.com', 'Representative Address', 1)
RETURNING id;

INSERT INTO identifiers (system, value, type, user_profile_id, related_person_id)
VALUES
    ('http://ar.gov/dni', '87654321', 'NATIONAL_ID', NULL, 1);
