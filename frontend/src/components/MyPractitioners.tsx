import { useMedicalStore } from '../store/useMedicalStore';
import { Video } from 'lucide-react';

export default function MyPractitioners() {
  const { practitioners } = useMedicalStore();

  if (!practitioners|| practitioners.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        No tenés profesionales asignados todavía.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {practitioners.map((practitioner) => (
        <div
          key={practitioner.name}
          className="bg-white  rounded-2xl border border-[var(--color-accent)] p-6 transition-all duration-300 transform hover:scale-[1.03] animate-cloud"
        >
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={practitioner.avatar}
              alt={practitioner.name}
              className="w-12 h-12 rounded-full border border-[var(--color-accent)] object-cover"
            />
            <div>
              <h3 className="font-poppins font-semibold text-sm text-[var(--color-primary)]">
                {practitioner.name}
              </h3>
              <p className="font-inter text-sm text-[var(--color-text)]">
                {practitioner.specialty}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="font-inter text-xs text-[var(--color-text)] mb-1">
              Próxima cita
            </div>
            <div className="font-inter font-medium text-sm text-[var(--color-text)]">
              {practitioner.nextAppt|| 'Sin asignar'}
            </div>
          </div>

          <div className="flex space-x-2">
          <a
              href={practitioner.videoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[var(--color-accent)] rounded-lg px-4 py-2 hover:bg-[var(--color-accent-hover)]"
            >
              <Video size={18} />
              <span className="text-sm font-medium">Videollamada</span>
            </a>

          </div>
        </div>
      ))}
    </div>
  );
}
