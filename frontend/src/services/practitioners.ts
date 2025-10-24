import privateAPI from './api/privateAPI';
import type { PractitionerRoleCreatePayload } from '../types/practitioner.types';

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

// Obtener profesionales activos
export const getPractitioners = () =>
  privateAPI.get('/api/v1/practitioners/list').then((res) => res.data.content);

