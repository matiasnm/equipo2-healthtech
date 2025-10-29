import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEncounterById, updateEncounter } from '../services/encounters';
import { getAppointmentById } from '../services/appointments';

const Encounter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [encounter, setEncounter] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await getEncounterById(id);
        const data = res?.data ?? res;
        if (!mounted) return;
        setEncounter(data);
        // si viene appointmentId, traer appointment para obtener teleconsultationUrl
        const apptId = data?.appointmentId ?? data?.appointment?.id;
        if (apptId) {
          try {
            const ar = await getAppointmentById(String(apptId));
            const aData = ar?.data ?? ar;
            if (mounted) setAppointment(aData);
          } catch (err) {
            console.warn('No se pudo obtener appointment', err);
          }
        }
      } catch (err) {
        console.error('Error fetching encounter', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSave = async () => {
    if (!id || !encounter) return;
    setSaving(true);
    try {
      const payload = {
        encounterStatus: encounter.encounterStatus,
        encounterClass: encounter.encounterClass,
        reasonCodeId: Number(encounter.reasonCodeId) || 0,
        diagnosisCodeId: Number(encounter.diagnosisCodeId) || 0,
        notes: encounter.notes ?? '',
      };
      await updateEncounter(id, payload);
      alert('Encuentro actualizado');
    } catch (err) {
      console.error('Error updating encounter', err);
      alert('No se pudo actualizar el encuentro');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Cargando encuentro...</div>;
  if (!encounter) return <div className="p-6">Encuentro no encontrado</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Encuentro #{id}</h1>
        <div className="flex gap-2">
          {appointment?.teleconsultationUrl && (
            <a
              href={appointment.teleconsultationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Abrir teleconsulta
            </a>
          )}
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-hover)]"
          >
            Volver
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={encounter.encounterStatus}
              onChange={(e) => setEncounter({ ...encounter, encounterStatus: e.target.value })}
              className="input w-full"
            >
              <option value="PLANNED">PLANNED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="FINISHED">FINISHED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Clase</label>
            <select
              value={encounter.encounterClass}
              onChange={(e) => setEncounter({ ...encounter, encounterClass: e.target.value })}
              className="input w-full"
            >
              <option value="IMP">IMP</option>
              <option value="AMB">AMB</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason Code ID</label>
            <input
              type="number"
              value={encounter.reasonCodeId ?? 0}
              onChange={(e) => setEncounter({ ...encounter, reasonCodeId: Number(e.target.value) })}
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Diagnosis Code ID</label>
            <input
              type="number"
              value={encounter.diagnosisCodeId ?? 0}
              onChange={(e) => setEncounter({ ...encounter, diagnosisCodeId: Number(e.target.value) })}
              className="input w-full"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Notas</label>
            <textarea
              value={encounter.notes ?? ''}
              onChange={(e) => setEncounter({ ...encounter, notes: e.target.value })}
              className="input w-full h-32"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded-md text-white ${saving ? 'bg-gray-400' : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]'}`}
          >
            {saving ? 'Guardando...' : 'Guardar encuentro'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Encounter;
