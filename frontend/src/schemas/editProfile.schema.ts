import { z } from 'zod';

export const editProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phone: z.string().min(6).optional(),
  address: z.string().min(4).optional(),
  gender: z.enum(['FEMALE', 'MALE', 'OTHER']).optional(),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "La fecha debe tener el formato YYYY-MM-DD",
  }).optional(),
  // documentType: z.string().min(2).optional(),
  // documentValue: z.string().min(4).optional(),
  // documentSystem: z.string().min(4).optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
