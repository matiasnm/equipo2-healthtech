import { useEffect, useState } from "react";
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
  const [view, setView] = useState<View>(Views.MONTH);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const { appointments, fetchByPractitioner, changeStatus } = useAppointments();

useEffect(() => {
  if (practitionerId) {
    fetchByPractitioner(practitionerId);
  }
}, [practitionerId]);


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
    const initials = event.title
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase();

    return (
      <div
        className="text-white text-xs font-semibold truncate"
        title={event.title}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md h-auto w-full border border-[var(--color-accent)]">
      {/* Header */}
      <div className="flex justify-center items-center gap-4 mb-2">
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
      </div>

      {/* Vistas */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setView(Views.MONTH)}
          className={`px-3 py-1 rounded-md ${
            view === Views.MONTH
              ? "bg-[var(--color-accent)] text-white"
              : "bg-white text-[var(--color-primary)]"
          } hover:bg-[var(--color-accent-hover)]`}
        >
          Vista mensual
        </button>
        <button
          onClick={() => setView(Views.WEEK)}
          className={`px-3 py-1 rounded-md ${
            view === Views.WEEK
              ? "bg-[var(--color-accent)] text-white"
              : "bg-white text-[var(--color-primary)]"
          } hover:bg-[var(--color-accent-hover)]`}
        >
          Vista semanal
        </button>
        <button
          onClick={() => setView(Views.DAY)}
          className={`px-3 py-1 rounded-md ${
            view === Views.DAY
              ? "bg-[var(--color-accent)] text-white"
              : "bg-white text-[var(--color-primary)]"
          } hover:bg-[var(--color-accent-hover)]`}
        >
          Vista diaria
        </button>
      </div>

      {/* Calendario */}
      <Calendar
        localizer={localizer}
        culture="es-AR"
        events={appointments}
        startAccessor={(event) => new Date(event.startTime)}
        endAccessor={(event) => new Date(event.endTime)}
        date={date}
        view={view}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        onSelectEvent={(event) => setSelectedEvent(event)}
        toolbar={false}
        style={{ height: "600px" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: getStatusColor(event.status),
            borderRadius: "4px",
            color: "white",
            fontSize: "0.65rem",
            padding: "0.5px",
            marginBottom: "0.5px",
            height: "15px",
            maxWidth: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          },
        })}
        components={{
          event: EventCompact,
          week: {
            header: CustomWeekHeader,
          },
        }}
      />

      {/* Modal de evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-2 text-[var(--color-primary)]">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-muted">
              {format(new Date(selectedEvent.startTime), "PPPPp", { locale: es })} –{" "}
              {format(new Date(selectedEvent.endTime), "p", { locale: es })}
            </p>
            <p className="mt-2 text-sm">
              Estado: <strong>{selectedEvent.status}</strong>
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 px-3 py-1 rounded-md bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
            >
              Cerrar
            </button>
            <button
              onClick={() => changeStatus(selectedEvent.id, "CANCELLED")}
              className="mt-2 px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Cancelar turno
            </button>
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
