
import { z } from 'zod';

export const assignPractitionerSchema = z.object({
  practitionerId: z.number().int().positive(),
});

export type AssignPractitionerFormData = z.infer<typeof assignPractitionerSchema>;
