export type AppointmentCreatePayload = {
  patientId: number;
  practitionerIds: number[];
  startTime: string; 
  endTime: string;   
  status?: AppointmentStatus;
  teleconsultationUrl?: string;
};

export type AppointmentUpdatePayload = AppointmentCreatePayload;

export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW' | "PENDING" | "CONFIRMED";

export type AvailablePractitionersRequest = {
  startTime: string;
  endTime: string;
};

export type Document = {
  id: string;
  name: string;
  downloadUrl: string;
};

export type Appointment = {
  id: string;
  patientId: number;
  practitionerIds: number[];
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  teleconsultationUrl?: string;
  patientProfile?: PatientProfile | null;
  practitionerProfile?: PractitionerProfile | null; 
  documents?: Document[]; 
};

export type PatientProfile = {
  id: number;
  fullName: string;
};

export type PractitionerProfile = {
  id: number;
  fullName: string;
  photoUrl?: string;
};




