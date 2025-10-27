import { z } from "zod";
import { practitionerProfileSchema } from "./practitioner.schema"; 

export const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  downloadUrl: z.string().url(),
});

export const patientProfileSchema = z.object({
  id: z.number(),
  fullName: z.string(),
});


export const appointmentSchema = z.object({
  id: z.string(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "startTime debe ser una fecha ISO válida",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "endTime debe ser una fecha ISO válida",
  }),
  status: z.enum(["SCHEDULED","NO_SHOW", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]), 
  patientProfile: patientProfileSchema.nullable().optional(), 
  practitionerProfile: practitionerProfileSchema.nullable().optional(), 
  documents: z.array(documentSchema).optional(), 
});

export const appointmentsSchema = z.array(appointmentSchema);

// Tipos derivados
export type Appointment = z.infer<typeof appointmentSchema>;
export type AppointmentList = z.infer<typeof appointmentsSchema>;
