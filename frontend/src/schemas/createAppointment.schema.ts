
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  patientId: z.number().int().positive(),
  practitionerIds: z.array(z.number().int().positive()).min(1),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de inicio inválida',
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de fin inválida',
  }),
});

export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;
