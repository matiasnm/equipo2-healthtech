INSERT INTO "users"
(clinic_id, email, role, password, mfa_required, account_locked, credentials_expired, account_expiration, credentials_expiration, first_name, last_name, phone, active, created_at, updated_at)
VALUES
    (
        1,
        'admin@example.com',
        'ADMIN',
        '$2y$10$t3GvXZJVb6yI7tRMLKwXjersYz4dxVTM.oxPW2z/9g9W4taCasrBC',
        false,
        false,
        false,
        now() + interval '1 year',
        now() + interval '180 days',
        'Admin',
        'User',
        '1234567890',
        true,
        now(),
        now()
    );