import API from './api';

export const getPractitionerById = (id: string) =>
  API.get(`/api/v1/practitioners/${id}`);

export const getCurrentPractitioner = () =>
  API.get('/api/v1/practitioners/me');

export const getAllPractitioners = () =>
  API.get('/api/v1/practitioners/list');

export const setPractitionerRole = (id: string, data: any) =>
  API.post(`/api/v1/practitioners/practitioner-roles/${id}`, data);
