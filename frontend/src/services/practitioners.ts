import privateAPI from './api/privateAPI';
import axios from 'axios';
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

export async function getPractitioners() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }

  try {
    const { data, config } = await axios.get("/api/v1/practitioners/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    
    console.log(" Headers enviados:", config.headers); 
    console.log(" Practitioners response (raw):", JSON.stringify(data, null, 2));
    console.log("content[0]:", data?.content?.[0]);
    console.log(" totalElements:", data?.totalElements);

    const parsed = practitionersResponseSchema.parse(data);
    return parsed.content;
  } catch (err: any) {
    console.error(" Error al obtener practitioners:");
    console.error("Status:", err.response?.status); 
    console.error("Body:", err.response?.data);     
    console.error("Headers:", err.response?.headers); 
    throw err;
  }
}
