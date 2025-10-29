export type AppointmentCreatePayload = {
  patientId: number;
  practitionerIds: number[];
  startTime: string; 
  endTime: string;   
  status?: AppointmentStatus;
  teleconsultationUrl?: string | undefined;
};

export type AppointmentUpdatePayload = AppointmentCreatePayload;

export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export type AvailablePractitionersRequest = {
  startTime: string;
  endTime: string;
};

export type Appointment = {
  id: string;
  patientId: number;
  practitionerIds: number[];
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  teleconsultationUrl?: string | undefined;
  patientProfile?: {
    fullName: string;
  };
  practitionerProfiles?: {
    fullName: string;
  }[];
  channel: 'IN_PERSON' | 'VIDEO' | 'PHONE';
};



