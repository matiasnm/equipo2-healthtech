import { create } from "zustand";
import { getAllAppointments, getAppointmentsByPractitioner, createAppointment, updateAppointment, changeAppointmentStatus,} from "../services/appointments";
import type { Appointment, AppointmentCreatePayload, AppointmentUpdatePayload, AppointmentStatus,} from "../types/appointment.types";

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

export const useAppointments = create<State>((set) => ({
  appointments: [],
  loading: false,
  error: null,

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllAppointments();
      console.log("Citas recibidas del backend:", data); // ✅ Confirmación visual
      set({ appointments: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Error al cargar turnos", loading: false });
    }
  },

  fetchByPractitioner: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getAppointmentsByPractitioner(id);
      const valid = data.filter(
        (apt) =>
          apt.startTime &&
          apt.endTime &&
          !isNaN(Date.parse(apt.startTime)) &&
          !isNaN(Date.parse(apt.endTime))
      );
      set({ appointments: valid, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Error al filtrar por profesional", loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true });
    try {
      const payload: AppointmentCreatePayload = {
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        patientId: data.patientId,
        practitionerIds: data.practitionerIds,
        ...(data.status && { status: data.status }),
        ...(data.teleconsultationUrl && { teleconsultationUrl: data.teleconsultationUrl }),
      };
      await createAppointment(payload);
      await useAppointments.getState().fetchAppointments();
    } catch (err: any) {
      set({ error: err.message || "Error al crear turno", loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true });
    try {
      await updateAppointment(id, data);
      await useAppointments.getState().fetchAppointments();
    } catch (err: any) {
      set({ error: err.message || "Error al actualizar turno", loading: false });
    }
  },

  changeStatus: async (id, status) => {
    set({ loading: true });
    try {
      await changeAppointmentStatus(id, status);
      await useAppointments.getState().fetchAppointments();
    } catch (err: any) {
      set({ error: err.message || "Error al cambiar estado", loading: false });
    }
  },
}));
