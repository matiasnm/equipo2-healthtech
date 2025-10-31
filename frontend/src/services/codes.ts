import privateAPI from './api/privateAPI';

type CodesListResponse = any;

/**
 * Obtiene códigos de diagnóstico/reason para encounters.
 * Soporta query params: page, size, search
 */
export const getEncounterReasonDiagnosisCodes = async (params?: { page?: number; size?: number; search?: string; }) => {
  const { page = 0, size = 100, search = '' } = params || {};
  const res = await privateAPI.get('/api/v1/codes/encounter-reason-diagnosis', {
    params: { page, size, search },
  });
  return res.data as CodesListResponse;
};

/**
 * Obtiene las especialidades de practitioner
 * Soporta query params: page, size, search
 */
export const getPractitionerSpecialities = async (params?: { page?: number; size?: number; search?: string; }) => {
  const { page = 0, size = 100, search = '' } = params || {};
  const res = await privateAPI.get('/api/v1/codes/practitioner-speciality', {
    params: { page, size, search },
  });
  return res.data as CodesListResponse;
};

export default {
  getEncounterReasonDiagnosisCodes,
};
