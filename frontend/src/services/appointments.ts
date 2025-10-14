import API from './api';

export const getAppointmentById = (id: string) =>
  API.get(`/api/v1/appointments/${id}`);

export const createAppointment = (data: any) =>
  API.post('/api/v1/appointments/create', data);

export const updateAppointment = (id: string, data: any) =>
  API.put(`/api/v1/appointments/update/${id}`, data);

export const changeAppointmentStatus = (id: string, status: string) =>
  API.put(`/api/v1/appointments/update/status/${id}/${status}`);

export const getAvailablePractitioners = (data: any) =>
  API.post('/api/v1/appointments/available-practitioners', data);
