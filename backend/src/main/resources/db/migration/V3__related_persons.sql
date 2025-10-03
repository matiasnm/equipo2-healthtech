CREATE TYPE related_person_type AS ENUM (
    'NEXT_OF_KIN',
    'EMERGENCY_CONTACT',
    'DESIGNATED_REPRESENTATIVE',
    'PARENT',
    'MOTHER',
    'GUARDIAN',
    'OTHER'
    );

CREATE TABLE related_persons (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    type related_person_type NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT
);