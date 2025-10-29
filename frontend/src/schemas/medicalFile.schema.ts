import { z } from 'zod';

export const MedicalFileSchema = z.object({
  name: z.string(),
  type: z.string(),
  date: z.string(),
  encounterId: z.number(),
  patientId: z.number()
});

export type MedicalFile = z.infer<typeof MedicalFileSchema>;
