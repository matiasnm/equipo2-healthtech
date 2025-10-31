import { z } from "zod";


export const appointmentStatusEnum = z.enum([
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
]);

export const createAppointmentSchema = z.object({
  patientId: z.number().int().positive(),
  practitionerIds: z.array(z.number().int().positive()).min(1),
  startTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha de inicio inválida",
    }),
  endTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Fecha de fin inválida",
    }),
  channel: z.string().min(1, "Canal requerido"), 
  priority: z.string().optional(), 
  status: appointmentStatusEnum,

});

export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;
