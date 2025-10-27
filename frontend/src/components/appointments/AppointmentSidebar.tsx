import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppointments } from "../../hooks/useAppointments";
import { CalendarClockIcon } from "lucide-react";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";

type SidebarProps = {
  date: Date;
  practitionerId: number;
  onCreate: () => void;
};

const AppointmentSidebar = ({
  date,
  practitionerId,
  onCreate,
}: SidebarProps) => {
  const { appointments, loading } = useAppointments();

  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.startTime);
    const sameDay =
      apptDate.getFullYear() === date.getFullYear() &&
      apptDate.getMonth() === date.getMonth() &&
      apptDate.getDate() === date.getDate();

    const matchesPractitioner = appt.practitionerIds.includes(practitionerId);

    return sameDay && matchesPractitioner;
  });

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-md border border-[var(--color-accent)] animate-cloud">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-primary)]">
          Turnos del día
        </h2>

      </div>

      <div className="relative pl-8">
        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-[var(--color-accent)] rounded-full" />

        {loading && <p className="text-sm text-muted">Cargando turnos...</p>}

        <ul className="space-y-10">
          {filteredAppointments.map((apt) => (
            <li key={apt.id} className="relative mb-10 flex items-center gap-4">
              <div
                className="absolute top-1 w-4 h-4 rounded-full border-1 border-white shadow-sm"
                style={{ backgroundColor: getStatusColor(apt.status) }}
              />

              <div className="flex justify-between items-center w-full ml-10">
                <div>
                  <div className="font-medium mx-2 text-[var(--color-primary)]">
                    {apt.patientProfile?.fullName ?? "Paciente sin nombre"}
                  </div>
                  <div className="text-xs text-[var(--color-accent)]">
                    {apt.status}
                  </div>
                </div>
                <div className="text-sm text-muted text-right">
                  {format(new Date(apt.startTime), "HH:mm", { locale: es })}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-6 gap-2">
          <button
            onClick={() => console.log("Ver turnos pasados")}
            title="Ver turnos pasados"
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-[var(--color-secondary-light)] hover:bg-[var(--color-secondary)] text-[var(--color-primary)]"
          >
            <GiPreviousButton className="w-4 h-4" />
          </button>

          <button
            onClick={() => console.log("Editar vista")}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
          >
            <CalendarClockIcon className="w-4 h-4" /> Editar
          </button>

          <button
            onClick={() => console.log("Ver turnos futuros")}
            title="Ver turnos futuros"
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-[var(--color-secondary-light)] hover:bg-[var(--color-secondary)] text-[var(--color-primary)]"
          >
            <GiNextButton className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSidebar;

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
