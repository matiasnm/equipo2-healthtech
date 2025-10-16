-- Create User
INSERT INTO users (
    email,
    password,
    role,
    status,
    blocked,
    active,
    mfa_required,
    account_locked,
    credentials_expired,
    created_at,
    updated_at
) VALUES (
             'patient1@ht.com',
             '$2y$10$wf6wEH15w85iVcYTW2KGTuLFtwDMDBtDap476dkLJasENuSYnUVJ2', -- bcrypt "patient"
             'PATIENT',
             true,
             0,
             true,
             false,
             false,
             false,
             now(),
             now()
         ) RETURNING id;

INSERT INTO patients (user_id)
VALUES (2);

-- Suppose the returned id is 2
-- Create User Profile
INSERT INTO user_profiles (user_id, full_name, gender, phone, address, birthday)
VALUES (2, 'Patient One', 'FEMALE', '555-0100', 'Patient Street 10', '1990-05-15');

-- Add Identifiers
INSERT INTO identifiers (system, value, type, user_id, related_person_id)
VALUES
    ('http://ar.gov/dni', '23456789', 'NATIONAL_ID', 2, NULL),
    ('http://passport.gov', 'B2345678', 'PASSPORT', 2, NULL);

-- Optional: add Related Person
INSERT INTO related_persons (type, full_name, phone, email, address, user_id)
VALUES
    ('DESIGNATED_REPRESENTATIVE', 'Jane Doe', '555-0200', 'jane.doe@example.com', 'Representative Address', 2)
RETURNING id;

-- Create User
INSERT INTO users (
    email,
    password,
    role,
    status,
    blocked,
    active,
    mfa_required,
    account_locked,
    credentials_expired,
    created_at,
    updated_at
) VALUES (
             'doctor1@ht.com',
             '$2y$10$7VAu6lR5sV6a4giiaNXOiuGV5bv3vOu3324g.qIpaIwQM2rdo9O5S', -- bcrypt "doctor"
             'PRACTITIONER',
             true,
             0,
             true,
             false,
             false,
             false,
             now(),
             now()
         ) RETURNING id;

-- Suppose the returned id is 3
INSERT INTO practitioners (user_id)
VALUES (3);

-- Create User Profile
INSERT INTO user_profiles (user_id, full_name, gender, phone, address, birthday)
VALUES (3, 'Dr. John Smith', 'MALE', '555-0300', 'Doctor Street 20', '1985-09-01');

-- Add Identifiers
INSERT INTO identifiers (system, value, type, user_id, related_person_id)
VALUES
    ('http://ar.gov/dni', '34567890', 'NATIONAL_ID', 3, NULL),
    ('http://passport.gov', 'C3456789', 'PASSPORT', 3, NULL);

-- Add Practitioner Profile
INSERT INTO practitioner_profiles (
    experience,
    studies,
    office_code,
    remote
) VALUES
    (10, 'Cardiology specialization at UBA', 'A1', true)
RETURNING id;

UPDATE practitioners
SET practitioner_profile_id = 1
WHERE user_id = 3;


-- Create User
INSERT INTO users (
    email,
    password,
    role,
    status,
    blocked,
    active,
    mfa_required,
    account_locked,
    credentials_expired,
    created_at,
    updated_at
) VALUES (
             'patient2@ht.com',
             '$2y$10$wf6wEH15w85iVcYTW2KGTuLFtwDMDBtDap476dkLJasENuSYnUVJ2', -- bcrypt "patient"
             'PATIENT',
             false,
             0,
             true,
             false,
             false,
             false,
             now(),
             now()
         ) RETURNING id;

INSERT INTO patients (user_id)
VALUES (4);