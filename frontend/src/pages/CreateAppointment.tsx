import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Layout, Navbar, Footer } from "../components/ui";
import { toast } from "react-toastify";
import { createAppointment, getAvailablePractitioners } from "../services/appointments";
import { getPractitionerSpecialities } from "../services/codes";
import { getPractitioners } from "../services/practitioners";
import { useAuth } from "../hooks/useAuth";
import { buildLocalDate, formatWithLocalOffset } from '../utils/date';

const SLOT_MINUTES = 30;
const DAY_START = 8; // 8:00
const DAY_END = 19; // 19:00

const CreateAppointment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [specialities, setSpecialities] = useState<Array<any>>([]);
  const [specialityCode, setSpecialityCode] = useState<string>("");

  const [practitioners, setPractitioners] = useState<Array<any>>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<any | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return d.toLocaleDateString().slice(0, 10); // yyyy-mm-dd
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    // cargar especialidades
    (async () => {
      try {
        const res = await getPractitionerSpecialities({ page: 0, size: 200 });
        setSpecialities(res?.content || []);
      } catch (err) {
        console.error("Error cargando especialidades", err);
        toast.error("No se pudieron cargar las especialidades");
      }
    })();
  }, []);

  const handleSearchPractitioners = async () => {
    setLoading(true);
    try {
      // Intentamos llamar al endpoint listado; la API del backend acepta list sin filtros o con query
      const res = await getPractitioners();
      // filtrado local por speciality code si se eligió
      const filtered = res.filter((p: any) => {
        try {
          const sp = p?.practitionerRole?.specialityCode?.code || p?.practitionerRole?.specialityCode?.system;
          if (!specialityCode) return true;
          return sp === specialityCode || String(p?.practitionerRole?.specialityCode?.id) === String(specialityCode);
        } catch (e) {
          return true;
        }
      });
      setPractitioners(filtered);
      if (filtered.length === 0) toast.info("No se encontraron profesionales para esa especialidad");
    } catch (err) {
      console.error(err);
      toast.error("Error al buscar profesionales");
    } finally {
      setLoading(false);
    }
  };

  const slots = useMemo(() => {
    // generar franjas para selectedDate entre 8 y 19 cada 30'
    const d = new Date(selectedDate + "T00:00:00");
    const result: Array<{ start: Date; end: Date }> = [];
    for (let hour = DAY_START; hour < DAY_END; hour++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        const hh = String(hour).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        const start = buildLocalDate(selectedDate, `${hh}:${mm}`);
        const end = new Date(start.getTime() + SLOT_MINUTES * 60000);
        result.push({ start, end });
      }
    }
    return result;
  }, [selectedDate]);

  const handleSlotClick = async (slotStart: Date, slotEnd: Date) => {
    if (!selectedPractitioner) return toast.info("Seleccioná un profesional primero");
    if (!user?.id) return navigate("/login");

    // Verificar disponibilidad: consultar /available-practitioners para ese slot
    try {
      // TEMP: restar un día antes de enviar (fix rápido solicitado)
      const adjustedStart = new Date(slotStart.getTime() - 24 * 60 * 60 * 1000);
      const adjustedEnd = new Date(slotEnd.getTime() - 24 * 60 * 60 * 1000);

      const payload = {
        startTime: formatWithLocalOffset(adjustedStart),
        endTime: formatWithLocalOffset(adjustedEnd),
        specialityCode: specialityCode || selectedPractitioner?.practitionerRole?.specialityCode?.code || "",
        remote: !!selectedPractitioner?.practitionerProfile?.remote,
      };
      console.log('CreateAppointment: selectedDate=', selectedDate);
      console.log('CreateAppointment: slotStart (toString)=', slotStart.toString());
      console.log('CreateAppointment: adjustedStart (toString)=', adjustedStart.toString());
      console.log('CreateAppointment: slotStart components=', slotStart.getFullYear(), slotStart.getMonth() + 1, slotStart.getDate(), slotStart.getHours(), slotStart.getMinutes());
      console.log('CreateAppointment: adjustedStart components=', adjustedStart.getFullYear(), adjustedStart.getMonth() + 1, adjustedStart.getDate(), adjustedStart.getHours(), adjustedStart.getMinutes());
      console.log('CreateAppointment: availability payload=', payload);

      const available = await getAvailablePractitioners(payload);
      const includesSelected = Array.isArray(available) && available.some((p: any) => String(p.id) === String(selectedPractitioner.id));

      if (!includesSelected) {
        toast.error("El profesional no está disponible en esa franja");
        return;
      }

      // crear turno
      // format start/end with local offset (ej: 2025-10-30T09:00-03:00)
      const appointmentPayload = {
        patientId: Number(user.id),
        practitionerIds: [Number(selectedPractitioner.id)],
        startTime: formatWithLocalOffset(adjustedStart),
        endTime: formatWithLocalOffset(adjustedEnd),
      } as any;
      console.log('CreateAppointment: appointmentPayload=', appointmentPayload);

      await createAppointment(appointmentPayload);
      toast.success("Turno creado con éxito");
      navigate("/appointments");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo crear el turno");
    }
  };

  return (
    <Layout>
      <Navbar />
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Crear turno</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Especialidad</label>
            <select
              className="mt-1 block w-full rounded border px-3 py-2"
              value={specialityCode}
              onChange={(e) => setSpecialityCode(e.target.value)}
            >
              <option value="">-- Elegir especialidad --</option>
              {specialities.map((s: any) => (
                <option key={s.id} value={s.code || s.id}>{s.display || s.code}</option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Profesionales</label>
            <div className="mt-1">
              <button onClick={handleSearchPractitioners} className="btn-primary">Buscar profesionales</button>
            </div>
            <div className="mt-2 max-h-48 overflow-auto border rounded p-2">
              {loading && <div>Cargando profesionales...</div>}
              {!loading && practitioners.length === 0 && <div className="text-sm text-gray-500">No hay profesionales</div>}
              {practitioners.map((p: any) => (
                <div key={p.id} className={`p-2 rounded cursor-pointer ${selectedPractitioner?.id === p.id ? 'bg-blue-100' : ''}`} onClick={() => setSelectedPractitioner(p)}>
                  <div className="font-medium">{p.userProfile?.fullName || p.practitionerProfile?.fullName || `Profesional ${p.id}`}</div>
                  <div className="text-xs text-gray-600">{p.practitionerRole?.specialityCode?.display || p.practitionerRole?.specialityCode?.code}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <Input label="Fecha" type="date" value={selectedDate} onChange={(e: any) => setSelectedDate(e.target.value)} />
            <div className="mt-2 text-sm text-gray-600">Seleccioná la fecha para ver franjas horarias</div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Franjas disponibles (8:00 - 19:00, {SLOT_MINUTES} minutos)</h2>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((s, idx) => (
              <button
                key={idx}
                className="border rounded px-2 py-1 text-sm text-left hover:bg-gray-100"
                onClick={() => handleSlotClick(s.start, s.end)}
                title={`${s.start.toLocaleTimeString()} - ${s.end.toLocaleTimeString()}`}
              >
                <div className="font-medium">{s.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-xs text-gray-500">{s.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default CreateAppointment;
