import privateAPI from "./api/privateAPI";
import { createAppointmentSchema } from "../schemas/createAppointment.schema";
import { z } from "zod";
import type {
  AppointmentCreatePayload,
  AppointmentUpdatePayload,
  AppointmentStatus,
  ResponseAppointmentList,
} from "../types/appointment.types";

// Tipos para disponibilidad
const availabilityResponseSchema = z.object({
  availableDays: z.array(z.string().refine((val) => !isNaN(Date.parse(val)))),
  availableHours: z.array(z.number().int().min(0).max(23)),
});

export const createAppointment = async (data: AppointmentCreatePayload) => {
  createAppointmentSchema.parse(data); 
  const res = await privateAPI.post("/api/v1/appointments/create", data);
  return res.data;
};

export const updateAppointment = async (
  id: string,
  data: Partial<AppointmentUpdatePayload>
) => {
  const res = await privateAPI.put(`/api/v1/appointments/update/${id}`, data);
  return res.data;
};

export const changeAppointmentStatus = async (
  id: string,
  status: AppointmentStatus
) => {
  const res = await privateAPI.put(
    `/api/v1/appointments/update/status/${id}/${status}`
  );
  return res.data;
};

export const getAvailablePractitioners = async (data: {
  startTime: string;
  endTime: string;
  specialityCode: string;
  remote: boolean;
}) => {
  const res = await privateAPI.post(
    "/api/v1/appointments/available-practitioners",
    data
  );
  return res.data;
};

export const getAvailabilityByPractitioner = async (
  id: number,
  filters: {
    startTime: string;
    endTime: string;
    specialityCode: string;
    remote: boolean;
  }
) => {
  try {
    // Log del payload 
    console.log(" Payload enviado a disponibilidad:", {
      practitionerId: id,
      ...filters,
    });

    const res = await privateAPI.post(
      `/api/v1/appointments/available-practitioners/${id}`,
      filters
    );

    // Log de la respuesta cruda
    console.log(" Respuesta cruda de disponibilidad:", res.data);

    if (typeof res.data !== "object" || res.data === null) {
      console.warn(" Respuesta inválida: no es un objeto", res.data);
      return { availableDays: [], availableHours: [] };
    }

    const parsed = availabilityResponseSchema.safeParse(res.data);

    // Log del resultado del parseo Zod
    if (!parsed.success) {
      console.warn(" ZodError en disponibilidad:", parsed.error.format());
      return { availableDays: [], availableHours: [] };
    }

    // Log de éxito
    console.log("Disponibilidad parseada correctamente:", parsed.data);
    return parsed.data;
  } catch (err) {
    console.error("Error al obtener disponibilidad:", err);
    return { availableDays: [], availableHours: [] };
  }
};

export const getAppointments = async () => {
  const res = await privateAPI.get("/api/v1/appointments/list");
  return res.data;
};


export const getPractitionerWeeklyAvailability = async (practitionerId: number) => {
  try {
    const res = await privateAPI.get(
      `/api/v1/appointments/available-practitioners/weekly/${practitionerId}`
    );

    if (typeof res.data !== "object" || res.data === null) {
      console.warn("Respuesta inválida de disponibilidad semanal:", res.data);
      return {};
    }

    console.log("Disponibilidad semanal recibida:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error al obtener disponibilidad semanal:", err);
    return {};
  }
};



export const getAllAppointments = async () => {
  const res = await privateAPI.get('/api/v1/appointments/list');
  return res.data;
};

export const getAppointmentsByPractitioner = async (): Promise<ResponseAppointmentList> => {
  const response = await privateAPI.get(`/api/v1/appointments/list`);
  return response.data;
};


export const getAppointmentById = (id: string) =>
  privateAPI.get(`/api/v1/appointments/${id}`);

