import type { PractitionerSummary } from "../schemas/practitioner.schema";

export function groupPractitionersBySpecialty(
  practitioners: PractitionerSummary[]
): Record<string, PractitionerSummary[]> {
  return practitioners.reduce((acc, p) => {
    const key = p.practitionerRole.specialityCode.code; // 👈 usamos code estable
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {} as Record<string, PractitionerSummary[]>);
}
