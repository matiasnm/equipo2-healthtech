import { useAppointments } from '../../hooks/useAppointments';
import { createAppointmentSchema } from '../../schemas/createAppointment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { CreateAppointmentFormData } from '../../schemas/createAppointment.schema';

type Props = {
  date: Date;
  practitionerId: number;
  onClose: () => void;
};

const AppointmentForm = ({ date, practitionerId, onClose }: Props) => {
  const { create, loading } = useAppointments();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(createAppointmentSchema),
  });

const onSubmit = async (data: CreateAppointmentFormData) => {
  try {
    await create({
      ...data,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
      teleconsultationUrl: data.teleconsultationUrl ?? undefined,
    });
  } catch (error) {
    console.error("Error al crear turno", error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 max-w-xl mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">Crear nueva cita</h2>

      {/* Campos del formulario */}
      <input type="number" {...register('patientId')} placeholder="ID del paciente" className="input w-full" />
      <input type="datetime-local" {...register('startTime')} className="input w-full" />
      <input type="datetime-local" {...register('endTime')} className="input w-full" />
      <select multiple {...register('practitionerIds')} className="input w-full">
        <option value={1}>Profesional 1</option>
        <option value={2}>Profesional 2</option>
      </select>
      <select {...register('status')} className="input w-full">
        <option value="SCHEDULED">Programado</option>
        <option value="CANCELLED">Cancelado</option>
        <option value="COMPLETED">Completado</option>
        <option value="NO_SHOW">Ausente</option>
      </select>
      <input type="url" {...register('teleconsultationUrl')} placeholder="URL de teleconsulta" className="input w-full" />

      <button type="submit" disabled={loading} className="btn bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] w-full mt-4">
        Crear turno
      </button>
    </form>
  );
};


export default AppointmentForm;

