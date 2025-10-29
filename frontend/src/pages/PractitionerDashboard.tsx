import React, { useMemo } from 'react';
import { Card, Button } from '../components/ui';
import { toast } from 'react-toastify';

// Tipos exportables para facilitar el reemplazo por tipos reales después
export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface PatientSummary {
  id: string | number;
  fullName: string;
  age?: number;
}

export interface Appointment {
  id: string | number;
  start: string; // ISO
  end?: string; // ISO
  patient: PatientSummary;
  reason?: string;
  status: AppointmentStatus;
}

// Mock de datos (fáciles de reemplazar por un fetch posterior)
const now = new Date();
const todayBase = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    start: new Date(todayBase.getTime() + 30 * 60000).toISOString(), // hoy 9:30
    end: new Date(todayBase.getTime() + 60 * 60000).toISOString(),
    patient: { id: 101, fullName: 'María García', age: 34 },
    reason: 'Consulta general',
    status: 'SCHEDULED',
  },
  {
    id: 'a2',
    start: new Date(todayBase.getTime() + 90 * 60000).toISOString(), // hoy 10:30
    end: new Date(todayBase.getTime() + 120 * 60000).toISOString(),
    patient: { id: 102, fullName: 'Carlos López', age: 57 },
    reason: 'Control de hipertensión',
    status: 'SCHEDULED',
  },
  {
    id: 'a3',
    start: new Date(todayBase.getTime() - 120 * 60000).toISOString(), // hoy 7:00 (pasada)
    end: new Date(todayBase.getTime() - 90 * 60000).toISOString(),
    patient: { id: 103, fullName: 'Lucía Fernández', age: 28 },
    reason: 'Retorno',
    status: 'COMPLETED',
  },
  {
    id: 'a4',
    start: new Date(todayBase.getTime() + 6 * 24 * 60 * 60000).toISOString(), // dentro de 6 días
    end: new Date(todayBase.getTime() + 6 * 24 * 60 * 60000 + 30 * 60000).toISOString(),
    patient: { id: 104, fullName: 'Sofía Martín', age: 41 },
    reason: 'Consulta nueva',
    status: 'SCHEDULED',
  },
  {
    id: 'a5',
    start: new Date(todayBase.getFullYear(), todayBase.getMonth(), 3).toISOString(), // otro día del mes (no-show ejemplo)
    end: new Date(todayBase.getFullYear(), todayBase.getMonth(), 3, 9, 30).toISOString(),
    patient: { id: 105, fullName: 'Diego Ramos', age: 50 },
    reason: 'Teleconsulta',
    status: 'NO_SHOW',
  },
];

const fmtTime = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const isWithinMinutes = (iso: string, minutesBefore = 10) => {
  const start = new Date(iso).getTime();
  const nowMs = Date.now();
  return nowMs >= start - minutesBefore * 60000 && nowMs <= start + 60 * 60000; // activo desde x min antes hasta 60 min después
};

const PractitionerDashboard: React.FC = () => {
  // En un futuro reemplazar MOCK_APPOINTMENTS por fetch y mapear al tipo Appointment
  const appointments = useMemo(() => {
    // ordenar por start
    return [...MOCK_APPOINTMENTS].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }, []);

  // KPIs
  const kpis = useMemo(() => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfToday = startOfToday + 24 * 60 * 60 * 1000;

    const completedToday = appointments.filter(
      (a) => a.status === 'COMPLETED' && new Date(a.start).getTime() >= startOfToday && new Date(a.start).getTime() < endOfToday
    ).length;

    const nextWeekFrom = Date.now();
    const nextWeekTo = nextWeekFrom + 7 * 24 * 60 * 60 * 1000;
    const scheduledNextWeek = appointments.filter((a) => {
      const t = new Date(a.start).getTime();
      return t >= nextWeekFrom && t <= nextWeekTo && a.status === 'SCHEDULED';
    }).length;

    const noShowsThisMonth = appointments.filter((a) => {
      if (a.status !== 'NO_SHOW') return false;
      const d = new Date(a.start);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return { completedToday, scheduledNextWeek, noShowsThisMonth };
  }, [appointments]);

  // Próxima cita (la próxima SCHEDULED a partir de ahora)
  const nextAppointment = useMemo(() => {
    const nowMs = Date.now();
    const future = appointments.filter((a) => new Date(a.start).getTime() >= nowMs && a.status === 'SCHEDULED');
    return future.length ? future[0] : null;
  }, [appointments]);

  const handleStartTeleconsult = (appointment: Appointment) => {
    // Placeholder: en el futuro navegar a sala/abrir modal
    toast.info(`Iniciando teleconsulta con ${appointment.patient.fullName}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Mesa de Control — Médico</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Citas completadas hoy</h3>
          <p className="text-2xl font-semibold">{kpis.completedToday}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Citas próximas 7 días</h3>
          <p className="text-2xl font-semibold">{kpis.scheduledNextWeek}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-gray-500">Ausencias este mes</h3>
          <p className="text-2xl font-semibold">{kpis.noShowsThisMonth}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Próxima cita</h3>
            {nextAppointment ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{new Date(nextAppointment.start).toLocaleDateString()}</p>
                  <p className="text-xl font-bold">{fmtTime(nextAppointment.start)} — {nextAppointment.patient.fullName}</p>
                  <p className="text-sm text-gray-600">{nextAppointment.reason}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleStartTeleconsult(nextAppointment)}
                    disabled={!isWithinMinutes(nextAppointment.start, 10)}
                  >
                    Iniciar Teleconsulta
                  </Button>
                  <Button variant="secondary" onClick={() => toast.info('Abrir sala de espera (mock)')}>Abrir Sala de Espera</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay citas próximas.</p>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-3">Agenda de hoy</h3>
            <div className="space-y-3">
              {appointments
                .filter((a) => new Date(a.start).toDateString() === new Date().toDateString())
                .map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-md bg-white/50 border">
                    <div>
                      <p className="font-medium">{a.patient.fullName}</p>
                      <p className="text-sm text-gray-500">{fmtTime(a.start)} • {a.reason}</p>
                    </div>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${a.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' : a.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' : a.status === 'NO_SHOW' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </section>

        <aside>
          <Card className="p-4 mb-6">
            <h4 className="text-sm text-gray-600">Acceso rápido</h4>
            <div className="mt-3 flex flex-col gap-3">
              <Button variant="secondary" onClick={() => toast.info('Ir a Agenda completa (mock)')}>Ver Agenda completa</Button>
              <Button variant="secondary" onClick={() => toast.info('Crear nueva cita (mock)')}>Crear cita</Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="text-sm text-gray-600">Resumen del día</h4>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>Próxima cita: {nextAppointment ? `${fmtTime(nextAppointment.start)} • ${nextAppointment.patient.fullName}` : '—'}</li>
              <li>Citas programadas hoy: {appointments.filter(a => new Date(a.start).toDateString() === new Date().toDateString()).length}</li>
              <li>No-shows este mes: {kpis.noShowsThisMonth}</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default PractitionerDashboard;
