import { z } from "zod";

export const codeDescriptorSchema = z.object({
  id: z.number().optional(),
  system: z.string(),
  code: z.string(),
  display: z.string(),
  definition: z.string(),
});


export const practitionerRoleSchema = z.object({
  roleCode: codeDescriptorSchema,
  specialityCode: codeDescriptorSchema,
});

// Perfil del usuario (información personal) — coincide con la respuesta API en `userProfile`
export const userProfileSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  gender: z.string(),
  phone: z.string(),
  address: z.string(),
  birthday: z.string(),
  photoUrl: z.string().url().optional(),
  education: z.string().optional(),
  experience: z.number().optional(),
  // identificadores pueden no venir del API; lo hacemos opcional
  identifiers: z.array(
    z.object({
      system: z.string(),
      value: z.string(),
      type: z.string(),
      userId: z.number(),
    })
  ).optional(),
});

// Perfil profesional (información de practitionerProfile en la API)
export const practitionerProfileSchema = z.object({
  experience: z.number().optional(),
  studies: z.string().optional(),
  officeCode: z.string().optional(),
  remote: z.boolean().optional(),
});

export const practitionerSummarySchema = z.object({
  id: z.number(),
  userProfile: userProfileSchema,
  practitionerRole: practitionerRoleSchema,
  practitionerProfile: practitionerProfileSchema,
});

export const practitionersSchema = z.array(practitionerSummarySchema);


export const practitionersResponseSchema = z.object({
  content: practitionersSchema,
  totalElements: z.number(),
  totalPages: z.number(),
});

export type PractitionerResponse = z.infer<typeof practitionersResponseSchema>;
export type PractitionerSummary = z.infer<typeof practitionerSummarySchema>;
export type PractitionerList = z.infer<typeof practitionersSchema>;
