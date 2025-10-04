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
    'admin@healthtech.com',
    '$2y$10$6./inPlJPCrrGRz.fWlAL.DW1ULNVzvpBBFpE8u0pBph97sJWj8ZK', -- bcrypt hash, pass = "admin"
    'ADMIN',
    true,
    0,
    true,
    false,
    false,
    false,
    now(),
    now()
    );