import { useParams, useNavigate } from 'react-router-dom';
import { getEncounterById, updateEncounter } from '../services/encounters';
import { getAppointmentById } from '../services/appointments';
import { useEffect, useState } from 'react';
import { getEncounterReasonDiagnosisCodes } from '../services/codes';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Layout, Navbar, Loading } from '../components/ui';
import { toast } from 'react-toastify';

export const EncounterPractitioner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [encounter, setEncounter] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>(null);
  const [codes, setCodes] = useState<any[]>([]);
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
        // mapear shape del backend: `reason` y `diagnosis` vienen como objetos
        const mapped = {
          ...data,
          reasonCodeId: data?.reason?.id ?? data?.reasonCodeId ?? null,
          diagnosisCodeId: data?.diagnosis?.id ?? data?.diagnosisCodeId ?? null,
        };
        setEncounter(mapped);
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

    // load codes (reason/diagnosis)
    (async () => {
      try {
        const r = await getEncounterReasonDiagnosisCodes({ size: 200 });
        // respuesta esperada tiene `content` con el arreglo de codes
        const list = r?.content ?? r?.data ?? r ?? [];
        if (mounted && Array.isArray(list)) setCodes(list);
      } catch (err) {
        console.warn('No se pudieron cargar códigos de diagnosis', err);
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
      // enviar la estructura con objetos reason/diagnosis (backend devuelve así)
      const payload: any = {
        encounterStatus: encounter.encounterStatus,
        encounterClass: encounter.encounterClass,
        notes: encounter.notes ?? '',
      };
      if (encounter.reasonCodeId) payload.reasonCodeId = Number(encounter.reasonCodeId) ;
      if (encounter.diagnosisCodeId) payload.diagnosisCodeId = Number(encounter.diagnosisCodeId) ;

      await updateEncounter(id, payload);
      toast.success('Encuentro actualizado');
    } catch (err) {
      console.error('Error updating encounter', err);
      toast.error('No se pudo actualizar el encuentro');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Layout>
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-md shadow">
            <div className="flex items-center justify-center py-8">
              <Loading text="Cargando encuentro..." />
            </div>
          </div>
        </div>
      </Layout>
    );
  if (!encounter) return <div className="p-6">Encuentro no encontrado</div>;

  return (
    <Layout>
      <Navbar />
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
          <Button onClick={() => navigate(-1)} variant="secondary" size="md">
            Volver
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Select
              label="Estado"
              name="encounterStatus"
              value={encounter.encounterStatus ?? ''}
              onChange={(e) => setEncounter({ ...encounter, encounterStatus: e.target.value })}
              options={[
                { value: 'PLANNED', label: 'Programado' },
                { value: 'IN_PROGRESS', label: 'En curso' },
                { value: 'COMPLETED', label: 'Completado' },
                { value: 'CANCELLED', label: 'Cancelado' },
                { value: 'ON_HOLD', label: 'En espera' },
                { value: 'DISCONTINUED', label: 'Interrumpido' },
                { value: 'DISCHARGED', label: 'Egresado' },
                { value: 'ENTERED_IN_ERROR', label: 'Error de registro' },
                { value: 'UNKNOWN', label: 'Desconocido' },
              ]}
            />
          </div>

          <div>
            <Select
              label="Clase"
              name="encounterClass"
              value={encounter.encounterClass ?? ''}
              onChange={(e) => setEncounter({ ...encounter, encounterClass: e.target.value })}
              options={[
                { value: 'IMP', label: 'Internación' },
                { value: 'AMB', label: 'Ambulatorio' },
              ]}
            />
          </div>

          <div>
            <Select
              label="Diagnóstico"
              name="diagnosisCode"
              value={encounter.diagnosisCodeId ? String(encounter.diagnosisCodeId) : ''}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : null;
                // por ahora reason y diagnosis se setean iguales
                setEncounter({ ...encounter, diagnosisCodeId: val, reasonCodeId: val });
              }}
              options={codes.map((c: any) => ({
                value: String(c.id),
                label: c.display ?? c.code ?? `${c.system ?? ''}:${c.id}`,
              }))}
              {...(encounter.diagnosisCodeId ? { placeholder: String(encounter.diagnosisCodeId) } : {})}
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
          <Button onClick={handleSave} variant="accent" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar encuentro'}
          </Button>
        </div>
      </div>
    </div>
    </Layout>
  );
};