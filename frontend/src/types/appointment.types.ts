export type AppointmentCreatePayload = {
  
  practitionerIds: number[];
  patientId: number;
  startTime: string; // ISO
  endTime: string;   // ISO
  channel: string;
  priority?: string;
  status: "SCHEDULED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
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


