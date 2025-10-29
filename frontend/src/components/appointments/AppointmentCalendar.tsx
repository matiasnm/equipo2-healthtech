import { useEffect, useState, useMemo } from "react";
import { fetchPatientFromFhirMock } from "../../services/fhirMock";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { useAppointments } from "../../hooks/useAppointments";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "es-AR": es },
});

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  practitionerId: number;
};


export const AppointmentCalendar = ({ date, setDate, practitionerId }: Props) => {
  const [view, setView] = useState<View>(Views.AGENDA);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [patient, setPatient] = useState<any>(null);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const navigate = useNavigate();
  const { appointments, fetchByPractitioner, changeStatus } = useAppointments();
  // Map appointments from the store (API) to the event shape expected by react-big-calendar
  const calendarEvents = useMemo(() => {

    const normalize = (maybe: any) => {
      if (!maybe) return [];
      if (Array.isArray(maybe)) return maybe;
      if (maybe.data && Array.isArray(maybe.data)) return maybe.data;
      if (maybe.appointments && Array.isArray(maybe.appointments)) return maybe.appointments;
      return [];
    };
    console.log('Appointments from store:', appointments);
    const source = normalize(appointments);
    return source.map((a: any) => ({
      ...a,
      title: a.patientProfile?.fullName ?? `Paciente ${a.patientId}`,
      patientId: a.patientId,
    }));
  }, [appointments]);

  // cache local de nombres de pacientes cuando la respuesta del backend no trae patientProfile
  const [patientNames, setPatientNames] = useState<Record<number, string>>({});

  useEffect(() => {
    let mounted = true;
    const missing = calendarEvents
      .filter((e: any) => !e.patientProfile && e.patientId && !patientNames[e.patientId])
      .map((e: any) => e.patientId);

    if (missing.length === 0) return;

    (async () => {
      for (const id of missing) {
        try {
          const p = await fetchPatientFromFhirMock(id);
          if (!mounted) return;
          if (p?.fullName) {
            setPatientNames((prev) => ({ ...prev, [id]: p.fullName }));
          }
        } catch (err) {
          // no bloqueante, dejamos el fallback
          console.error('fetchPatientFromFhirMock error', err);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [calendarEvents]);

  // eventos que realmente pasamos al calendar — usamos patientNames si hace falta
  const displayedEvents = useMemo(() => {
    return calendarEvents.map((e: any) => ({
      ...e,
      title: e.patientProfile?.fullName ?? patientNames[e.patientId] ?? `Paciente ${e.patientId}`,
    }));
  }, [calendarEvents, patientNames]);

  // Mock de disponibilidad por profesional (en el futuro viene del backend)
  const getPractitionerAvailability = (id: number) => {
    // ejemplo: lunes(1), miercoles(3), jueves(4) y horario 09:00 - 17:00
    return {
      weekdays: [1, 3, 4],
      startHour: 9,
      endHour: 17,
    };
  };

  const availability = getPractitionerAvailability(practitionerId);

  // dayPropGetter para marcar en gris dias no laborales en vista mensual/dia
  const dayPropGetter = (date: Date) => {
    const weekday = date.getDay(); // 0 dom .. 6 sab
    // adaptamos: availability.weekdays usa 1..7? en nuestro mock usamos 1=lunes
    // convertimos weekday (0..6) a 0=domingo -> 1..7 mapping: monday=1 => weekday===1
    // en JS: monday=1, wednesday=3, thursday=4 (matches our mock)
    if (!availability.weekdays.includes(weekday)) {
      return { style: { backgroundColor: '#f3f4f6', color: '#9CA3AF' } };
    }
    return {};
  };

  // slotPropGetter para marcar franjas horarias fuera del rango como deshabilitadas
  const slotPropGetter = (date: Date) => {
    const weekday = date.getDay();
    const hour = date.getHours();
    if (!availability.weekdays.includes(weekday)) {
      return { style: { backgroundColor: '#f3f4f6', color: '#9CA3AF', minHeight: '50px' } };
    }
    if (hour < availability.startHour || hour >= availability.endHour) {
      return { style: { backgroundColor: '#fafafa', color: '#d1d5db', minHeight: '50px' } };
    }
    // dentro del horario laboral dejamos la casilla más alta
    return { style: { minHeight: '50px' } };
  };

  useEffect(() => {
    if (practitionerId) {
      fetchByPractitioner(practitionerId);
    }
  }, [practitionerId]);

  // scrollToTime: posicionar el scroll del calendario en la hora actual al cargar
  const scrollToTime = (() => {
    const now = new Date();
    const t = new Date();
    t.setHours(now.getHours(), now.getMinutes(), 0, 0);
    return t;
  })();

  // textos en español para los controles del calendario
  const messages = {
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Todo el día',
    week: 'Semana',
    work_week: 'Semana laboral',
    day: 'Día',
    month: 'Mes',
    previous: 'Anterior',
    next: 'Siguiente',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    today: 'Hoy',
    agenda: 'Agenda',
    showMore: (total: number) => `+${total} más`,
  } as any;

  const CustomWeekHeader = ({ date }: { date: Date }) => {
    const day = format(date, "EEE", { locale: es });
    const num = format(date, "d", { locale: es });

    return (
      <div className="text-center text-[var(--color-primary)] font-medium">
        <div>{day}</div>
        <div className="text-sm text-muted">{num}</div>
      </div>
    );
  };

  const EventCompact = ({ event }: { event: any }) => {
    return (
      <div
        className="text-white text-sm font-semibold truncate"
        title={event.title}
      >
        {event.title}
      </div>
    );
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!selectedEvent) return;
      if (!selectedEvent.patientId) return;
      setLoadingPatient(true);
      try {
        const p = await fetchPatientFromFhirMock(selectedEvent.patientId);
        if (mounted) setPatient(p);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoadingPatient(false);
      }
    };
    load();
    return () => {
      mounted = false;
      setPatient(null);
      setLoadingPatient(false);
    };
  }, [selectedEvent]);

  const canStart = (startIso: string) => {
    const startMs = new Date(startIso).getTime();
    const now = Date.now();
    return now >= startMs - 10 * 60000 && now <= startMs + 60 * 60000;
  };

  const canCancel = (startIso: string) => {
    // regla: no permitir cancelar con menos de 2 horas de anticipación
    const startMs = new Date(startIso).getTime();
    return Date.now() <= startMs - 2 * 60 * 60000;
  };

  const handleStartTeleconsult = (event: any) => {
    // Crear un encounter en el backend y navegar al detalle
    (async () => {
      try {
        const payload = {
          encounterStatus: 'PLANNED',
          encounterClass: 'IMP',
          reasonCodeId: 404684003,
          diagnosisCodeId: 0,
          appointmentId: event.id,
          patientId: event.patientId,
          notes: event.reason ?? '',
        };
        const { createEncounter } = await import('../../services/encounters');
        const res = await createEncounter(payload);
        const created = res?.data ?? res;
        const encounterId = created?.id ?? created?.encounterId ?? created?.data?.id;
        if (encounterId) {
          navigate(`/encounter/${encounterId}`);
        } else {
          console.warn('Encounter creado pero sin id en la respuesta', created);
          alert('Encounter creado pero no se pudo obtener el id. Revisá la respuesta del servidor.');
        }
      } catch (err) {
        console.error('Error creando encounter', err);
        alert('No se pudo iniciar la consulta. Intentá nuevamente.');
      }
    })();
  };

  const handleChangeStatus = async (id: string, status: string) => {
    try {
      await changeStatus(id, status as any);
      setSelectedEvent(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md h-auto w-full border border-[var(--color-accent)]">
      {/* Calendario */}
      <Calendar
        localizer={localizer}
        culture="es-AR"
        messages={messages}
        events={displayedEvents}
        startAccessor={(event) => new Date(event.startTime)}
        endAccessor={(event) => new Date(event.endTime)}
        date={date}
        view={view}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        onSelectEvent={(event) => setSelectedEvent(event)}
        toolbar={true}
        /* aumentar altura general para que las casillas sean visualmente más grandes */
        style={{ height: "700px" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: getStatusColor(event.status),
            borderRadius: "4px",
            color: "white",
            fontSize: "1 rem",
            padding: "0.5px",
            marginBottom: "0.5px",
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "pointer",
          },
        })}
        components={{
          event: EventCompact,
          week: {
            header: CustomWeekHeader,
          },
        }}
        scrollToTime={scrollToTime}
        dayPropGetter={dayPropGetter}
        slotPropGetter={slotPropGetter}
      />

      {/* Modal de evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-2 text-[var(--color-primary)]">{selectedEvent.title}</h3>
            <p className="text-sm text-muted">{format(new Date(selectedEvent.startTime), "PPPPp", { locale: es })} – {format(new Date(selectedEvent.endTime), "p", { locale: es })}</p>
            <p className="mt-2 text-sm">Estado: <strong>{statusLabel(selectedEvent.status)}</strong></p>

            <div className="mt-3 border-t pt-3">
              <h4 className="text-sm font-semibold">Paciente</h4>
              {loadingPatient ? (
                <p className="text-sm text-gray-500">Cargando paciente...</p>
              ) : patient ? (
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{patient.fullName}</p>
                  {patient.birthDate && <p>Fecha de nacimiento: {new Date(patient.birthDate).toLocaleDateString()}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Sin datos del paciente</p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-3 py-1 rounded-md bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
              >
                Cerrar
              </button>

              <button
                onClick={() => handleStartTeleconsult(selectedEvent)}
                disabled={!canStart(selectedEvent.startTime)}
                className={`px-3 py-1 rounded-md ${canStart(selectedEvent.startTime) ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                Iniciar cita
              </button>

              <button
                onClick={() => {
                  if (!canCancel(selectedEvent.startTime)) {
                    alert('No se puede cancelar con menos de 2 horas de anticipación');
                    return;
                  }
                  handleChangeStatus(selectedEvent.id, 'CANCELLED');
                }}
                className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Cancelar
              </button>

              <button
                onClick={() => handleChangeStatus(selectedEvent.id, 'NO_SHOW')}
                className="px-3 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Marcar Ausente
              </button>

              <button
                onClick={() => handleChangeStatus(selectedEvent.id, 'COMPLETED')}
                className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "scheduled":
      return "var(--color-accent)";
    case "completed":
      return "var(--color-success)";
    case "cancelled":
      return "var(--color-error)";
    case "no_show":
      return "var(--color-warning)";
    default:
      return "var(--color-secondary)";
  }
}


const statusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case "scheduled":
      return "Programado";
    case "completed":
      return "Completado";
    case "cancelled":
      return "Cancelado";
    case "no_show":
      return "Ausente";
    default:
      return status;
  } 
};
