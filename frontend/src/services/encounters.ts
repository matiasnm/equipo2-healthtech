import privateAPI from './api/privateAPI';

export const createEncounter = (data: any) =>
  privateAPI.post('/api/v1/encounters/create', data);

export const getEncounterById = (id: string) =>
  privateAPI.get(`/api/v1/encounters/${id}`);

export const updateEncounter = (id: string, data: any) =>
  privateAPI.put(`/api/v1/encounters/update/${id}`, data);

export const getEncounterByAppointmentId = (appointmentId: string) =>
  privateAPI.get(`/api/v1/appointments/${appointmentId}/encounter`);

export default {
  createEncounter,
  getEncounterById,
  updateEncounter,
  getEncounterByAppointmentId
};
