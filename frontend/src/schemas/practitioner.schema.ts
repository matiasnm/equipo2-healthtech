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

export const userProfileShema = z.object({
  studies: z.string().optional(),
  experience: z.number().optional(),
  officeCode: z.string().optional(),
  remote: z.boolean().optional(),
});

export const practitionerSummarySchema = z.object({
  id: z.number(),
  userProfile: userProfileShema,
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
