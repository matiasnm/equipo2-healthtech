import { useAppointments } from '../../hooks/useAppointments';
import { formatWithLocalOffset } from '../../utils/date';
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
      startTime: formatWithLocalOffset(new Date(data.startTime)),
      endTime: formatWithLocalOffset(new Date(data.endTime)),
      teleconsultationUrl: (data as any).teleconsultationUrl ?? undefined,
    } as any);
    // cerrar el formulario después de crear
    onClose();
  } catch (error) {
    console.error("Error al crear turno", error);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[var(--color-primary)]">Crear nueva cita</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID del paciente</label>
          <input type="number" {...register('patientId')} placeholder="ID del paciente" className="input w-full" />
          {errors.patientId && <p className="text-xs text-red-500 mt-1">{errors.patientId.message as any}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select {...register('status')} className="input w-full">
            <option value="SCHEDULED">Programado</option>
            <option value="CANCELLED">Cancelado</option>
            <option value="COMPLETED">Completado</option>
            <option value="NO_SHOW">Ausente</option>
          </select>
          {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status.message as any}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
          <input type="datetime-local" {...register('startTime')} className="input w-full" />
          {errors.startTime && <p className="text-xs text-red-500 mt-1">{errors.startTime.message as any}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
          <input type="datetime-local" {...register('endTime')} className="input w-full" />
          {errors.endTime && <p className="text-xs text-red-500 mt-1">{errors.endTime.message as any}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profesionales</label>
          <select {...register('practitionerIds')} className="input w-full" multiple size={2}>
            <option value={1}>Profesional 1</option>
            <option value={2}>Profesional 2</option>
          </select>
          {errors.practitionerIds && <p className="text-xs text-red-500 mt-1">{errors.practitionerIds.message as any}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de teleconsulta (opcional)</label>
          <input type="url" {...register('teleconsultationUrl')} placeholder="https://" className="input w-full" />
          {errors.teleconsultationUrl && <p className="text-xs text-red-500 mt-1">{errors.teleconsultationUrl.message as any}</p>}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]'}`}
        >
          {loading ? 'Creando...' : 'Crear turno'}
        </button>

        <button
          type="button"
          onClick={() => onClose()}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-[var(--color-primary)] bg-white hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};


export default AppointmentForm;

