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
             'doctor2@ht.com',
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
