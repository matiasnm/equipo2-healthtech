import { useEffect, useState, useMemo } from "react";
import { fetchPatientFromFhirMock } from "../../services/fhirMock";
import { useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { useAppointments } from "../../hooks/useAppointments";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";

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
  // Mock local de citas — se usa cuando el store no devuelve datos (fácil de reemplazar por fetch)
  const MOCK_APPOINTMENTS: any[] = [
    {
      id: 'm1',
      patientId: 101,
      patientProfile: { fullName: 'María García' },
      startTime: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
      status: 'SCHEDULED',
      reason: 'Consulta general',
    },
    {
      id: 'm2',
      patientId: 102,
      patientProfile: { fullName: 'Carlos López' },
      startTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
      status: 'SCHEDULED',
      reason: 'Control presión',
    },
    {
      id: 'm3',
      patientId: 103,
      patientProfile: { fullName: 'Lucía Fernández' },
      startTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
      status: 'COMPLETED',
      reason: 'Retorno',
    },
    {
      id: 'm4',
      patientId: 104,
      patientProfile: { fullName: 'Sofía Martín' },
      startTime: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
      status: 'SCHEDULED',
      reason: 'Consulta nueva',
    },
    {
      id: 'm6',
      patientId: 104,
      patientProfile: { fullName: 'Marcos Britos' },
      startTime: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
      status: 'SCHEDULED',
      reason: 'Consulta nueva',
    },
    {
      id: 'm5',
      patientId: 105,
      patientProfile: { fullName: 'Diego Ramos' },
      startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      endTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      status: 'SCHEDULED',
      reason: 'Teleconsulta',
    },
  ];

  // Map appointments from the store to the event shape expected by react-big-calendar
  const calendarEvents = useMemo(() => {
    const source = (appointments && appointments.length > 0) ? appointments : MOCK_APPOINTMENTS;
    return source.map((a: any) => ({
      ...a,
      title: a.patientProfile?.fullName ?? `Paciente ${a.patientId}`,
      patientId: a.patientId,
    }));
  }, [appointments]);

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


  const goToPrevious = () => {
    const newDate = new Date(date);
    switch (view) {
      case Views.MONTH:
        newDate.setMonth(date.getMonth() - 1);
        break;
      case Views.WEEK:
      case Views.WORK_WEEK:
        newDate.setDate(date.getDate() - 7);
        break;
      case Views.DAY:
        newDate.setDate(date.getDate() - 1);
        break;
    }
    setDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(date);
    switch (view) {
      case Views.MONTH:
        newDate.setMonth(date.getMonth() + 1);
        break;
      case Views.WEEK:
      case Views.WORK_WEEK:
        newDate.setDate(date.getDate() + 7);
        break;
      case Views.DAY:
        newDate.setDate(date.getDate() + 1);
        break;
    }
    setDate(newDate);
  };

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
    // const initials = event.title
    //   .split(" ")
    //   .map((word: string) => word[0])
    //   .join("")
    //   .toUpperCase();

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
    // Si existe teleconsultationUrl, abrir; si no, abrir url simulada
    const url = event.teleconsultationUrl ?? `/teleconsult/${event.id}`;
    // Abrir en nueva pestaña (mock)
    window.open(url, '_blank');
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
      {/* Header */}
      {/* <div className="flex justify-center items-center gap-4 mb-2">
        <button onClick={goToPrevious} title="Anterior">
          <GiPreviousButton className="w-5 h-5 text-[var(--color-primary)]" />
        </button>

        {view === Views.MONTH && (
          <h2 className="text-lg font-bold text-[var(--color-primary)]">
            {format(date, "MMMM yyyy", { locale: es })}
          </h2>
        )}

        <button onClick={goToNext} title="Siguiente">
          <GiNextButton className="w-5 h-5 text-[var(--color-primary)]" />
        </button>
      </div> */}

      {/* Vistas */}
      {/* <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setView(Views.DAY)}
          className={`px-3 py-1 rounded-md ${view === Views.DAY
            ? "bg-[var(--color-accent)] text-white"
            : "bg-white text-[var(--color-primary)]"
            } hover:bg-[var(--color-accent-hover)]`}
        >
          Vista diaria
        </button>
        <button
          onClick={() => setView(Views.WEEK)}
          className={`px-3 py-1 rounded-md ${view === Views.WEEK
            ? "bg-[var(--color-accent)] text-white"
            : "bg-white text-[var(--color-primary)]"
            } hover:bg-[var(--color-accent-hover)]`}
        >
          Vista semanal
        </button>
        <button
          onClick={() => setView(Views.MONTH)}
          className={`px-3 py-1 rounded-md ${view === Views.MONTH
            ? "bg-[var(--color-accent)] text-white"
            : "bg-white text-[var(--color-primary)]"
            } hover:bg-[var(--color-accent-hover)]`}
        >
          Vista mensual
        </button>
      </div> */}

      {/* Calendario */}
      <Calendar
        localizer={localizer}
        culture="es-AR"
        messages={messages}
        events={calendarEvents}
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
            <p className="mt-2 text-sm">Estado: <strong>{selectedEvent.status}</strong></p>

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
