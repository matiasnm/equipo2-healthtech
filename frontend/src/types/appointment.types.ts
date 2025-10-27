export type AppointmentCreatePayload = {
  patientId: number;
  practitionerIds: number[];
  startTime: string; // formato ISO
  endTime: string;   // formato ISO
};

export type AppointmentUpdatePayload = {
  patientId: number;
  practitionerIds: number[];
  startTime: string;
  endTime: string;
};

export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export type AvailablePractitionersRequest = {
  startTime: string;
  endTime: string;
};


