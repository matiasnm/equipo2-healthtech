import { create } from 'zustand';
import { getAllAppointments, getAppointmentsByPractitioner, createAppointment, updateAppointment, changeAppointmentStatus,} from '../services/appointments';
import type { Appointment, AppointmentCreatePayload, AppointmentUpdatePayload, AppointmentStatus,} from '../types/appointment.types';

type State = {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
  fetchByPractitioner: (id: number) => Promise<void>;
  create: (data: AppointmentCreatePayload) => Promise<void>;
  update: (id: string, data: AppointmentUpdatePayload) => Promise<void>;
  changeStatus: (id: string, status: AppointmentStatus) => Promise<void>;
};

export const useAppointments = create<State>((set)=>({
    appointments: [],
    loading: false,
    error: null,

fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllAppointments();
      set({ appointments: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Error al cargar turnos', loading: false });
    }
  },

    fetchByPractitioner: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getAppointmentsByPractitioner();
      set({ appointments: data.content, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Error al filtrar por profesional", loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true });
    try {
      const payload = {
        ...data,
        teleconsultationUrl: data.teleconsultationUrl ?? undefined,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      };
      await createAppointment(payload);
      await useAppointments.getState().fetchAppointments();
    } catch (err: any) {
      set({ error: err.message || 'Error al crear turno', loading: false });
    }
  },
  update: async (id, data) => {
    set({ loading: true });
    try {
      await updateAppointment(id, data);
      await useAppointments.getState().fetchAppointments();
    } catch (err: any) {
      set({ error: err.message || 'Error al actualizar turno', loading: false });
    }
  },
  changeStatus: async (id, status) => {
    set({ loading: true });
    try {
      await changeAppointmentStatus(id, status);
      await useAppointments.getState().fetchAppointments();
    } catch (err: any) {
      set({ error: err.message || 'Error al cambiar estado', loading: false });
    }
  },
}));