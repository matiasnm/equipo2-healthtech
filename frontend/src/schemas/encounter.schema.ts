import { z } from 'zod';

export const CodeDescriptorSchema = z.object({
  id: z.number(),
  system: z.string(),
  code: z.string(),
  display: z.string(),
  definition: z.string()
});

export const EncounterSchema = z.object({
  id: z.number(),
  encounterStatus: z.string(),
  encounterClass: z.string(),
  reason: CodeDescriptorSchema,
  diagnosis: CodeDescriptorSchema,
  patientId: z.number(),
  appointmentId: z.number(),
  notes: z.string()
});

export type Encounter = z.infer<typeof EncounterSchema>;
