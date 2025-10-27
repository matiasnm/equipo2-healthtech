import privateAPI from './api/privateAPI';
import type { Appointment, AppointmentCreatePayload, AppointmentUpdatePayload, AppointmentStatus, } from "../types/appointment.types";

export const getAllAppointments = async () => {
  const res = await privateAPI.get('/api/v1/appointments');
  return res.data;
};

export const getAppointmentsByPractitioner = async (id: number): Promise<Appointment[]> => {
  const response = await privateAPI.get(`/appointments/by-practitioner/${id}`);
  return response.data;
};

export const getAppointmentById = (id: string) =>
  privateAPI.get(`/api/v1/appointments/${id}`);

export const createAppointment = (data: AppointmentCreatePayload) =>
  privateAPI.post('/api/v1/appointments/create', data);

export const updateAppointment = (id: string, data: any) =>
  privateAPI.put(`/api/v1/appointments/update/${id}`, data);

export const changeAppointmentStatus = (id: string, status: string) =>
  privateAPI.put(`/api/v1/appointments/update/status/${id}/${status}`);

export const getAvailablePractitioners = (data: any) =>
  privateAPI.post('/api/v1/appointments/available-practitioners', data);

export const getAvailabilityByPractitioner = async (id: number) => {
  const res = await privateAPI.post(`/api/v1/appointments/available-practitioners/${id}`, {
    startTime: "2025-10-24T00:00:00.000Z",
    endTime: "2025-10-31T23:59:59.999Z",
  });
  return res.data;
};