CREATE TABLE IF NOT EXISTS clinics (
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    tax_id VARCHAR(20),
    fiscal_id VARCHAR(20),
    address VARCHAR(255),
    province VARCHAR(100),
    country VARCHAR(100),
    administration_phone VARCHAR(50),
    administration_email VARCHAR(255),
    secretary_phone VARCHAR(50),
    secretary_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS offices (
    id SERIAL PRIMARY KEY,
    clinic_id BIGINT NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100),
    description TEXT,
    floor VARCHAR(10),
    active BOOLEAN DEFAULT TRUE
);

WITH inserted_clinic AS (
    INSERT INTO clinics (
        business_name,
        legal_name,
        tax_id,
        fiscal_id,
        address,
        province,
        country,
        administration_phone,
        administration_email,
        secretary_phone,
        secretary_email
    )
    VALUES ('Clínica Salud Integral SRL',
          'Salud Integral',
          '30-12345678-9',
          'ES12345678A',
          'Av. Siempre Viva 742',
          'Buenos Aires',
          'Argentina',
          '+54 11 5555-1234',
          'administracion@saludintegral.com',
          '+54 11 5555-2345',
          'secretaria@saludintegral.com'
    )
    RETURNING id
)

INSERT INTO offices (clinic_id, code, name, description, floor, active)
VALUES
    (1, 'A1', 'Consultorio A1', 'Atención general y control médico', '1', true),
    (1, 'B2', 'Consultorio B2', 'Pediatría y revisiones', '1', true),
    (1, 'B1', 'Consultorio B1', 'Oficina de Descanso', '1', false),
    (1, 'A6', 'Consultorio A6', 'Cardiología y diagnóstico', '2', true),
    (1, 'C5', 'Consultorio C5', 'Traumatología y fisioterapia', '2', true);