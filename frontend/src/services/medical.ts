import privateAPI from './api/privateAPI';
import { Encounter } from '../schemas/encounter.schema';
import type { MedicalFile } from '../types/medical.types';
import type { Appointment } from '../types/appointment.types';
import type { PractitionerDetail } from '../types/practitioner.types';
import type { User } from '../types/user.types';

// Encuentros
export async function getEncounters(): Promise<Encounter[]> {
  const res = await privateAPI.get('/api/v1/encounters/list');
  return res.data;
}

export async function getEncounterById(id: number): Promise<Encounter> {
  const res = await privateAPI.get(`/api/v1/encounters/${id}`);
  return res.data;
}

// Citas
export async function getAppointments(): Promise<Appointment[]> {
  const res = await privateAPI.get('/api/v1/appointments/list');
  return res.data;
}

export async function getAppointmentById(id: number): Promise<Appointment> {
  const res = await privateAPI.get(`/api/v1/appointments/${id}`);
  return res.data;
}

// Profesionales
export async function getPractitionerById(id: number): Promise<PractitionerDetail> {
  const res = await privateAPI.get(`/api/v1/practitioners/${id}`);
  return res.data;
}

export async function getPractitionersList(): Promise<PractitionerDetail[]> {
  const res = await privateAPI.get('/api/v1/practitioners/list');
  return res.data;
}

// Doctores vinculados al paciente
export async function getMyPractitioners(): Promise<PractitionerDetail[]> {
  const res = await privateAPI.get('/api/v1/patients/my-practitioners');
  return res.data;
}

// Archivos médicos derivados (PDF)
export async function getEncounterPDF(patientId: number, encounterId: number): Promise<Blob> {
  const res = await privateAPI.get(
    `/api/v1/pdf/patients/${patientId}/encounters/${encounterId}/summary`,
    { responseType: 'blob' }
  );
  return res.data;
}

// Usuario activo
export async function getCurrentUser(): Promise<User> {
  const res = await privateAPI.get('/api/v1/users/me');
  return res.data;
}

