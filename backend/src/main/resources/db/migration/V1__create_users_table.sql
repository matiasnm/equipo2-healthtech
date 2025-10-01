CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    clinic_id INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    mfa_required BOOLEAN DEFAULT false,
    account_locked BOOLEAN DEFAULT false,
    credentials_expired BOOLEAN DEFAULT false,
    account_expiration TIMESTAMP,
    credentials_expiration TIMESTAMP,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);