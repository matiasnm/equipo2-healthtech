import type { PatientProfile, PractitionerProfile, Document, AppointmentStatus } from "./appointment.types";

export type EncounterHistoryItem = {
  appointmentId: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  patient: PatientProfile | null;
  practitioner: {
    id: number;
    fullName: string;
    photoUrl?: string;
    specialty: string;
  } | null;
  documents: Document[];
};