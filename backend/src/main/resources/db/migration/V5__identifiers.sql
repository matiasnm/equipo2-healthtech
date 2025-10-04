CREATE TYPE identifier_type AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVER_LICENSE', 'HEALTH_CARD', 'OTHER');

CREATE TABLE identifiers (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES user_profiles(id) ON DELETE CASCADE,
    related_person_id BIGINT REFERENCES related_persons(id) ON DELETE CASCADE,
    system VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    type identifier_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);