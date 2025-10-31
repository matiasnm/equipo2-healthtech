import privateAPI from './api/privateAPI';
import axios from 'axios';
import type { PractitionerRoleCreatePayload } from '../types/practitioner.types';
import { practitionersResponseSchema, practitionersSchema } from "../schemas/practitioner.schema";

// Obtener practitioner por ID
export const getPractitionerById = (id: number) =>
  privateAPI.get(`/api/v1/practitioners/${id}`).then((res) => res.data);

// Obtener practitioner actual 
export const getCurrentPractitioner = () =>
  privateAPI.get('/api/v1/practitioners/me').then((res) => res.data);

// Asignar rol y especialidad a practitioner
export const setPractitionerRole = (id: number, data: PractitionerRoleCreatePayload) =>
  privateAPI.post(`/api/v1/practitioners/practitioner-roles/${id}`, data).then((res) => res.data);

// Obtener especialidades
export const getSpecialties = () =>
  privateAPI.get('/api/v1/specialties/list').then((res) => res.data);

export const getPractictioner = () => 
  privateAPI.get('/api/v1/practitioners/list').then((res) => res.data);
// Obtener profesionales activos

export async function getPractitioners() {
  try {
    // getPractictioner() returns the full response body (data)
    const data = await getPractictioner();

    // Validar forma esperada y devolver array de practitioners
    const parsed = practitionersResponseSchema.parse(data);
    return parsed.content;
  } catch (err: any) {
    console.error("Error al obtener practitioners:", err);
    throw err;
  }
}

