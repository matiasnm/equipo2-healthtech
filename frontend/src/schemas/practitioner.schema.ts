import { z } from 'zod';

export const practitionerSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  specialty: z.string().min(1, 'La especialidad es obligatoria'),
  education: z.string().optional(),
  experience: z.string().optional(),
  license: z.string().min(1, 'La matrícula es obligatoria'),
  availableDays: z.array(z.enum(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'])),
  availableHours: z.array(z.number().int().min(8).max(18)),
  imageUrl: z.string().url(),
  mapsLink: z.string().url().optional(),
  meetsLink: z.string().url().optional(),
  phoneNumberLink: z.string().optional(),
  whatsappLink: z.string().optional(),
  calendarLink: z.string().optional(),
});
