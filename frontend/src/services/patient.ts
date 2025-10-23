
import privateAPI from './api/privateAPI';
import type { AssignPractitionerPayload } from '../types/patient.types';

// Asignar médico de cabecera a paciente
export const assignGeneralPractitioner = (patientId: number, data: AssignPractitionerPayload) =>
  privateAPI.put(`/api/v1/patients/${patientId}/general-practitioner`, data).then((res) => res.data);

