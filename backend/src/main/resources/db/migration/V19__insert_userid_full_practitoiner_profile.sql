-- Suppose the returned id is 5
INSERT INTO practitioners (user_id)
VALUES (5);

-- Create User Profile
INSERT INTO user_profiles (user_id, full_name, gender, phone, address, birthday)
VALUES (5, 'Dr. Willy Wonka', 'MALE', '555-0300', 'Doctor Street 64', '1985-09-01');

-- Add Identifiers
INSERT INTO identifiers (system, value, type, user_profile_id, related_person_id)
VALUES
    ('http://ar.gov/dni', '34567891', 'NATIONAL_ID', 3, NULL),
    ('http://passport.gov', 'C3456789', 'PASSPORT', 3, NULL);

-- Add Practitioner Profile
INSERT INTO practitioner_profiles (
    experience,
    studies,
    office_code,
    remote
) VALUES
    (10, '', 'A1', true)
RETURNING id;

-- Suppose the returned id is 2
UPDATE practitioners
SET practitioner_profile_id = 2
WHERE user_id = 5;

INSERT INTO practitioner_roles (role_code_id, speciality_code_id)
VALUES
    ( 1, 2); -- speciality_code_id GOES FROM 1 TO 22...

-- Suppose the returned id is 2
UPDATE practitioners
SET practitioner_role_id = 2
WHERE user_id = 5;

INSERT INTO practitioner_unavailability (practitioner_id, day_of_week, start_time, end_time)
VALUES
    (5, 'MONDAY', '12:00:00+00', '16:00:00+00'),
    (5, 'TUESDAY', '08:00:00+00', '12:00:00+00');

