import { z } from "zod";

export const codeDescriptorSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
  definition: z.string(),
});

export const practitionerProfileSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  gender: z.string(),
  phone: z.string(),
  address: z.string(),
  birthday: z.string(),
  photoUrl: z.string().url().optional(),
  education: z.string().optional(),
  experience: z.number().optional(),
  identifiers: z.array(z.object({
    system: z.string(),
    value: z.string(),
    type: z.string(),
    userId: z.number(),
  })),
});


export const practitionerRoleSchema = z.object({
  roleCode: codeDescriptorSchema,
  specialityCode: codeDescriptorSchema,
});

export const practitionerSummarySchema = z.object({
  id: z.number(),
  practitionerProfile: practitionerProfileSchema,
  practitionerRole: practitionerRoleSchema,
});

export const practitionersSchema = z.array(practitionerSummarySchema);

export const practitionersResponseSchema = z.object({
  data: practitionersSchema,
});
// Tipos derivados automáticamente
export type PractitionerSummary = z.infer<typeof practitionerSummarySchema>;
export type PractitionerList = z.infer<typeof practitionersSchema>;
