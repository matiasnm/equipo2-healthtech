import { create } from 'zustand';
import type { Appointment } from '../types/appointment.types';

type Document = {
  id: string;
  name: string;
  downloadUrl: string;
};

type State = {
  documents: Document[];
  extractFromAppointments: (appointments: Appointment[]) => void;
};

export const useDocuments = create<State>((set) => ({
  documents: [],
  extractFromAppointments: (appointments) => {
    const docs = appointments.flatMap((apt) => apt.documents ?? []);
    set({ documents: docs });
  },
}));
