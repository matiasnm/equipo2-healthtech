import { useAppointments } from "./useAppointments";
import { usePractitioners } from "./usePractitioners";
import { EncounterHistoryItem } from "../types/encounter.types";
import { appointmentSchema } from "../schemas/appointment.schema";

export const useEncounterHistory = () => {
  const { appointments } = useAppointments();
  const { data: practitioners = [], getSpecialty } = usePractitioners();
  
  console.log("Appointments crudos:", appointments);

  const items: EncounterHistoryItem[] = appointments
    .map((apt): EncounterHistoryItem | null => {
      const parsed = appointmentSchema.safeParse(apt);
      if (!parsed.success) {
        console.warn("Appointment inválido:", parsed.error.format());
        return null;
      }

      const doc = practitioners.find(
        (p) => p.id === apt.practitionerProfile?.id
      );

      const practitioner = apt.practitionerProfile
        ? {
            id: apt.practitionerProfile.id,
            fullName: apt.practitionerProfile.fullName,
            specialty: doc?.practitionerRole?.specialityCode?.display ?? "Sin especialidad",
            ...(apt.practitionerProfile.photoUrl !== undefined && {
              photoUrl: apt.practitionerProfile.photoUrl,
            }),
          }
        : null;

      return {
        appointmentId: apt.id,
        startTime: apt.startTime,
        endTime: apt.endTime,
        status: apt.status,
        patient: apt.patientProfile ?? null,
        practitioner,
        documents: apt.documents ?? [],
      };
    })
    .filter((item): item is EncounterHistoryItem => item !== null);

  return { items };
};
