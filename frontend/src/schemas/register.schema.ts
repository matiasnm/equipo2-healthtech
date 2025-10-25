import { z } from 'zod';

export const registerSchema = z
  .object({
      
    email: z
      .string()
      .trim()
      .min(1, 'El email es obligatorio')
      .email('Ingresá un email válido'),

    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    confirmPassword: z
      .string()
      .min(6, 'Repetí la contraseña (mínimo 6 caracteres)'),

    // El rol se infiere automáticamente
    role: z.enum(['PATIENT', 'PRACTITIONER', 'ADMIN']).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
