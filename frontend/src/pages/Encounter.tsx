import { useEffect, useState } from 'react';
import { Clipboard, Users, FileText, Plus } from 'lucide-react';
import { useMedicalStore } from '../store/useMedicalStore';
import { Navbar, Layout } from '../components/ui';
import TopBar from '../components/TopBar';
import EncounterHistory from '../components/EncounterHistory';
import MyPractitioners from '../components/MyPractitioners';
import MedicalFiles from '../components/MedicalFiles';
import {
  getEncounters,
  getMyPractitioners,
  getAppointments
} from '../services/medical';
import { EncounterSchema } from '../schemas/encounter.schema';
import { practitionersSchema } from '../schemas/practitioner.schema';
import { MedicalFile } from '../schemas/medicalFile.schema';
import { EncounterView } from '../types/encounterView.types';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

type Section = 'encounters' | 'practitioners' | 'files';

const sectionTabs: {
  icon: React.ElementType;
  label: string;
  value: Section;
}[] = [
  { icon: Clipboard, label: 'Historial de encuentros', value: 'encounters' },
  { icon: Users, label: 'Mis doctores', value: 'practitioners' },
  { icon: FileText, label: 'Archivos médicos', value: 'files' },
];

export default function Encounter() {
  const [activeSection, setActiveSection] = useState<Section>('encounters');
  const navigate = useNavigate();
  const {
    setEncounters,
    setPractitioners,
    setFiles
  } = useMedicalStore();

  useEffect(() => {
    async function loadData() {
      try {
        // Encuentros (la API devuelve un objeto paginado { content: [...] } )
        const rawEncounters = await getEncounters();
        const encountersArray = Array.isArray(rawEncounters)
          ? rawEncounters
          : rawEncounters?.content ?? [];
        const parsedEncounters = z.array(EncounterSchema).parse(encountersArray);

        const encounterViews: EncounterView[] = parsedEncounters.map((e) => ({
          id: e.id,
          date: e.notes.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '',
          practitioner: e.diagnosis.display.includes('Johnson') ? 'Dra. Sarah Johnson' : 'Profesional',
          specialty: e.reason.display,
          type: e.encounterClass,
          status: e.encounterStatus,
          notes: e.notes
        }));

        setEncounters(encounterViews);

        // Archivos médicos
        const files: MedicalFile[] = parsedEncounters.map((e) => ({
          name: e.diagnosis.display,
          type: e.encounterClass,
          date: e.notes.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '',
          encounterId: e.id,
          patientId: e.patientId
        }));

        setFiles(files);

        // Profesionales y citas
        const [rawPractitioners, appointments] = await Promise.all([
          getMyPractitioners(),
          getAppointments()
        ]);

        const parsedPractitioners = practitionersSchema.parse(rawPractitioners);

        const practitioners = parsedPractitioners.map((p) => {
          const appt = appointments.find((a) => a.practitionerIds.includes(p.id));
          return {
            name: p.practitionerProfile.fullName,
            specialty: p.practitionerRole.specialityCode.display,
            avatar: p.practitionerProfile.photoUrl ?? '/default-avatar.png',
            nextAppt: appt?.startTime?.slice(0, 10) ?? '',
            videoUrl: appt?.channel === 'VIDEO' ? '/videocall/${appt.id}': ''
          };
        });

        setPractitioners(practitioners);
      } catch (error) {
        console.error('Error al cargar datos médicos:', error);
      }
    }

    loadData();
  }, [setEncounters, setFiles, setPractitioners]);

  return (
    <>
      <Navbar />
      <Layout>
        <TopBar />
        <main className="px-4 sm:px-6 pb-6 max-w-screen-xl mx-auto w-full">
          <div className="mb-6 text-center">
            <h1 className="font-poppins font-semibold text-2xl sm:text-3xl text-[var(--color-primary)] mb-2 truncate">
              Registro de encuentros médicos
            </h1>
            <p className="font-inter text-sm text-[var(--color-text)] max-w-md mx-auto">
              Consultá tu historial, profesionales y archivos médicos descargables
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {sectionTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                title={tab.label}
                onClick={() => setActiveSection(tab.value)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === tab.value
                    ? 'bg-[var(--color-accent-hover)] text-white'
                    : 'bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-accent-hover)]'
                }`}
              >
                <tab.icon size={18} className="mr-2" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
            <button
                key={sectionTabs.length + 1}
                type="button"
                title={"Crear cita"}
                onClick={() => navigate(ROUTES.APPOINTMENT_FORM)}
                className={'flex items-center px-4 py-2 rounded-lg transition-all duration-200 bg-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-accent-hover)]'
                }
              >
                <Plus size={18} className="mr-2" />
                <span className="text-sm font-medium">Crear cita</span>
              </button>
          </div>

          {activeSection === 'encounters' && <EncounterHistory />}
          {activeSection === 'practitioners' && <MyPractitioners />}
          {activeSection === 'files' && <MedicalFiles />}
        </main>
      </Layout>
    </>
  );
}







