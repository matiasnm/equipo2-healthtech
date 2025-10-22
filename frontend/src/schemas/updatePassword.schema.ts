
import { z } from 'zod';

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'Debe tener al menos 6 caracteres'),
  newPassword: z.string().min(8, 'Debe tener al menos 8 caracteres'),
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
