import { create } from 'zustand';

export type Encounter = {
  id: number;
  date: string;
  practitioner: string;
  specialty: string;
  type: string;
  status: string;
  notes: string;
};

export type Practitioner = {
  name: string;
  specialty: string;
  avatar: string;
  nextAppt: string;
  videoUrl?: string;
};

export type MedicalFile = {
  name: string;
  type: string;
  date: string;
  encounterId: number;
  patientId: number;
};

export interface MedicalState {
  encounters: Encounter[];
  practitioners: Practitioner[];
  files: MedicalFile[];
  setEncounters: (e: Encounter[]) => void;
  setPractitioners: (p: Practitioner[]) => void;
  setFiles: (f: MedicalFile[]) => void;
  clearMedicalData: () => void;
}

export const useMedicalStore = create<MedicalState>((set) => ({
  encounters: [],
  practitioners: [],
  files: [],

  setEncounters: (e) => set({ encounters: e }),
  setPractitioners: (p) => set({ practitioners: p }),
  setFiles: (f) => set({ files: f }),

  clearMedicalData: () => set({
    encounters: [],
    practitioners: [],
    files: []
  })
}));
