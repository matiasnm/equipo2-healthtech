import { useMedicalStore } from '../store/useMedicalStore';
import { getStatusClasses } from '../styles/status';

export default function EncounterHistory() {
  const { encounters } = useMedicalStore();

  if (!encounters|| encounters.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        No hay encuentros registrados aún.
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-accent)] rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.03] animate-cloude ">
      <h2 className="font-poppins font-semibold text-lg text-[var(--color-primary)] mb-6">
        Últimos encuentros
      </h2>
      <div className="space-y-4">
        {encounters.map((encounter) => (
          <div
            key={encounter.id}
            className="border border-[var(--color-accent)] rounded-lg p-4 hover:bg-[var(--color-base)] transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-poppins font-semibold text-sm text-[var(--color-primary)]">
                  {encounter.date}
                </div>
                <div className="font-inter text-sm text-[var(--color-muted)]">
                  {encounter.practitioner} • {encounter.specialty}
                </div>
              </div>
              <span
                    className={`inline-flex items-center px-3 py-1 rounded-lg font-inter font-semibold text-xs ${getStatusClasses(encounter.status)}`}
              >
                {encounter.status}
              </span>
            </div>
            <div className="font-inter text-sm text-[var(--color-primary)] mb-2">
              Tipo: {encounter.type}
            </div>
            <div className="font-inter text-sm text-[var(--color-muted)]">
              {encounter.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
