import type { CodeDescriptor } from './Common.types';

// Encuentros médicos
export type Encounter = {
  id: number;
  encounterStatus: string;
  encounterClass: string;
  reason: CodeDescriptor;
  diagnosis: CodeDescriptor;
  patientId: number;
  appointmentId: number;
  notes: string;
};

// Archivos médicos derivados
export type MedicalFile = {
  name: string;
  type: string;
  date: string;
  encounterId?: number;
  patientId?: number;
};
