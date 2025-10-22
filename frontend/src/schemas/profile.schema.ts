import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(1, 'El nombre es obligatorio'),
  phone: z.string().min(6, 'El teléfono es obligatorio'),
  address: z.string().min(1, 'La dirección es obligatoria'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  birthday: z.string().refine(val => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'La fecha debe tener formato YYYY-MM-DD',
  }),
  identifiers: z
    .array(z.object({
      system: z.string().min(1, 'El sistema es obligatorio'),
      value: z.string().min(1, 'El valor es obligatorio'),
      type: z.enum(['NATIONAL_ID', 'PASSPORT', 'DRIVER_LICENSE', 'HEALTH_CARD', 'OTHER']),
  }))
  .optional(),

  confirmation: z.boolean().refine(val => val === true, {
    message: 'Debés confirmar los datos antes de continuar',
  }),

});

export type ProfileFormData = z.infer<typeof profileSchema>;
