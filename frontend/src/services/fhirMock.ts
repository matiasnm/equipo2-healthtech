export type FhirPatient = {
  id: number | string;
  fullName: string;
  birthDate?: string; // ISO
  gender?: 'male' | 'female' | 'other' | 'unknown';
};

// Mock simple in-memory patient store
const MOCK_PATIENTS: Record<number, FhirPatient> = {
  101: { id: 101, fullName: 'María García', birthDate: '1991-04-12', gender: 'female' },
  102: { id: 102, fullName: 'Carlos López', birthDate: '1968-11-02', gender: 'male' },
  103: { id: 103, fullName: 'Lucía Fernández', birthDate: '1997-08-21', gender: 'female' },
  104: { id: 104, fullName: 'Sofía Martín', birthDate: '1984-02-14', gender: 'female' },
  105: { id: 105, fullName: 'Diego Ramos', birthDate: '1975-06-30', gender: 'male' },
};

export const fetchPatientFromFhirMock = async (patientId: number) => {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 250));
  return MOCK_PATIENTS[patientId] ?? { id: patientId, fullName: 'Paciente desconocido' };
};
