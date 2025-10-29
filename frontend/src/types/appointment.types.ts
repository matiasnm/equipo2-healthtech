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
};


export type ResponseAppointmentList = {
  content: Appointment[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    },
    offset: number;
    paged: boolean;
    unpaged: boolean;
  },
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  },
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}



