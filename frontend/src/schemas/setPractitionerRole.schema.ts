
import { z } from 'zod';

export const setPractitionerRoleSchema = z.object({
  roleCodeId: z.number().int().positive(),
  specialityCodeId: z.number().int().positive(),
});

export type SetPractitionerRoleFormData = z.infer<typeof setPractitionerRoleSchema>;
