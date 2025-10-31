import { useState } from "react";
import { toast } from "react-toastify";
import { createAppointment } from "../../../services/appointments";
import { createAppointmentSchema } from "../../../schemas/createAppointment.schema";
import type { AppointmentCreatePayload } from "../../../types/appointment.types";
import { formatWithLocalOffset, buildLocalDate } from '../../../utils/date';

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  practitioner: {
    id: number;
    name: string;
    specialty: string;
    availableDays: string[];
    availableHours: number[];
  };
  patient: {
    id: number;
    fullName: string;
  };
  metadata: {
    appointmentChannels: string[];
    appointmentPriority: string[];
    appointmentStatuses: string[];
  };
};

export const AppointmentModal = ({
  isOpen,
  onClose,
  practitioner,
  patient,
  metadata,
}: AppointmentModalProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const today = new Date();
  // Normalizamos availableDays a YYYY-MM-DD para evitar problemas con zonas horarias
  const validDays = practitioner.availableDays
    .map((dayStr) => {
      const d = new Date(dayStr);
      const pad = (n: number) => String(n).padStart(2, '0');
      const normalized = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      return { original: dayStr, date: d, normalized };
    })
    .filter(({ date }) => {
      const isFuture = date >= new Date(today.toDateString());
      const weekday = date.getDay();
      const isWeekday = weekday >= 1 && weekday <= 5;
      return isFuture && isWeekday;
    })
    .map(({ normalized }) => normalized);

  const slots = practitioner.availableHours.flatMap((hour) => [
    `${hour.toString().padStart(2, "0")}:00`,
    `${hour.toString().padStart(2, "0")}:30`,
  ]);

  const handleConfirm = async () => {
    if (!selectedDay || !selectedSlot) return;

    if (!patient.id || patient.id <= 0) {
      toast.error("No se pudo identificar al paciente.");
      return;
    }

    if (!practitioner.id || practitioner.id <= 0) {
      toast.error("No se pudo identificar al profesional.");
      return;
    }

    const channel = metadata.appointmentChannels[0];
    if (!channel) {
      toast.error("No hay canal válido para agendar.");
      return;
    }

    setLoading(true);
    console.log('AppointmentModal: selectedDay=', selectedDay);
    console.log('AppointmentModal: selectedSlot=', selectedSlot);

    try {
      // build local Date explicitly from parts to avoid timezone shifts
      const start = buildLocalDate(selectedDay, selectedSlot);
      const end = new Date(start.getTime() + 30 * 60000);

      const payload: any = {
        practitionerIds: [practitioner.id],
        patientId: patient.id,
        startTime: formatWithLocalOffset(start),
        endTime: formatWithLocalOffset(end),
        channel,
        status: "SCHEDULED",
        ...(metadata.appointmentPriority[0] && {
          priority: metadata.appointmentPriority[0],
        }),
      };

      createAppointmentSchema.parse(payload);
      await createAppointment(payload);

      toast.success("Tu cita fue agendada correctamente.");

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error creando cita:", err);
      toast.error("No se pudo crear la cita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg border border-[var(--color-accent)] shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Agendar cita</h2>

        <p>
          <strong>Especialista:</strong> {practitioner.name} ({practitioner.specialty})
        </p>
        <p>
          <strong>Paciente:</strong> {patient.fullName}
        </p>

        {/* Selección de día */}
        <div className="mt-4">
          <h3 className="font-semibold">Selecciona un día</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {validDays.length > 0 ? (
              validDays.map((normDay) => {
                const display = new Date(normDay + 'T00:00:00').toLocaleDateString("es-AR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                });
                return (
                  <button
                    key={normDay}
                    onClick={() => setSelectedDay(normDay)}
                    className={`px-3 py-1 rounded border ${selectedDay === normDay
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-200 border-[var(--color-accent)]"
                      }`}
                  >
                    {display}
                  </button>
                );
              })
            ) : (
              <span className="text-gray-400 text-sm">Sin días disponibles</span>
            )}
          </div>
        </div>

        {/* Selección de horario */}
        <div className="mt-4">
          <h3 className="font-semibold">Selecciona un horario</h3>
          <div className="flex gap-2 flex-wrap mt-2">
            {slots.length > 0 ? (
              slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-1 rounded border ${selectedSlot === slot
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-200 border-[var(--color-accent)]"
                    }`}
                >
                  {slot}
                </button>
              ))
            ) : (
              <span className="text-gray-400 text-sm">Sin horarios disponibles</span>
            )}
          </div>
        </div>

        {/* Botón confirmar */}
        <button
          onClick={handleConfirm}
          disabled={!selectedDay || !selectedSlot || loading}
          className="mt-6 px-6 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] w-full"
        >
          {loading ? "Enviando..." : "Confirmar cita"}
        </button>
      </div>
    </div>
  );
};
